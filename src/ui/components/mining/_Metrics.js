import {
  ChartContainer,
  ChartRow,
  Charts,
  Resizable,
  ScatterChart,
  YAxis
} from 'react-timeseries-charts';
import React, { Component, Fragment } from 'react';
import { TimeRange, TimeSeries } from 'pondjs';

import { Button } from '../generic';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import compose from 'recompose/compose';
import { connect } from 'react-redux';
import { fetchMetrics } from '../../../store/actions';
import throttle from 'lodash/throttle';
import { withStyles } from 'material-ui/styles';

const styles = {
  toolbar: {
    display: 'flex'
  },
  flex: {
    flex: 1
  }
};

class Metrics extends Component {
  state = {
    height: document.body.clientHeight,
    timeRange: new TimeRange([Date.now() - 600000, Date.now()]),
    liveMode: true,
    highlight: null
  };

  componentWillMount() {
    this.refreshMetrics();
    this.updateDimensions();
  }

  updateDimensions = () => {
    this.setState({ height: document.body.clientHeight });
  };

  componentDidMount() {
    window.addEventListener('resize', this.updateDimensions);
    this.startLiveModeInterval();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateDimensions);
    this.stopLiveModeInterval();
  }

  startLiveModeInterval = () => {
    this.stopLiveModeInterval();

    this.liveModeInterval = setInterval(() => {
      this.setState(
        ({ liveMode, timeRange }) => {
          if (!liveMode) return {};
          const newTimeRange = new TimeRange([
            timeRange.begin().getTime() + 1000,
            timeRange.end().getTime() + 1000
          ]);
          return {
            timeRange: newTimeRange
          };
        },
        () => {
          const { isMining } = this.props;
          isMining && this.refreshMetrics();
        }
      );
    }, 1000);
  };

  stopLiveModeInterval = () => {
    this.liveModeInterval && clearInterval(this.liveModeInterval);
  };

  refreshMetrics = throttle(() => {
    const { fetchMetrics, minerIdentifier } = this.props;
    const { timeRange } = this.state;
    const from = timeRange.begin().getTime();
    const to = timeRange.end().getTime();
    fetchMetrics(minerIdentifier, { from, to });
  }, 500);

  handleTimeRangeChanged = timeRange => {
    this.setState({ timeRange, liveMode: false }, this.refreshMetrics);
  };

  handleLiveModeClick = () => {
    this.setState(({ timeRange }) => {
      const newTimeRange = new TimeRange([timeRange.begin(), Date.now()]);
      return {
        liveMode: true,
        timeRange: newTimeRange
      };
    });
  };

  handleMouseNear = point => {
    this.setState({
      highlight: point
    });
  };

  perEventStyle = (column, event) => {
    if (event.get('errorMsg')) return { speed: { normal: { fill: 'red' } } };
    return {};
  };

  render() {
    const { classes, metricsData } = this.props;
    const { height, timeRange, liveMode, highlight } = this.state;

    const metricsSeriesData = {
      name: 'metrics',
      columns: ['time', 'speed', 'errorMsg'],
      points: metricsData
    };
    const metricsSeries = new TimeSeries(metricsSeriesData);

    let infoValues = [];
    if (highlight) {
      const speedText = `${highlight.event.get(highlight.column)} Mh/s`;
      const errorMsg = highlight.event.get('errorMsg');

      infoValues = [{ label: 'Speed', value: speedText }];
      if (errorMsg) infoValues.push({ label: 'Error', value: errorMsg });
    }

    return (
      <Fragment>
        <div className={classes.toolbar}>
          <div className={classes.flex} />
          <div>
            <Button disabled={liveMode} onClick={this.handleLiveModeClick}>
              Live Mode
            </Button>
          </div>
        </div>

        <Resizable>
          <ChartContainer
            enablePanZoom={true}
            onBackgroundClick={this.handleUnsetSelection}
            onTimeRangeChanged={this.handleTimeRangeChanged}
            timeRange={timeRange}
          >
            <ChartRow height={height - 540}>
              <YAxis
                format=".2f"
                id="speed"
                label="Speed (Mh/s)"
                max={(metricsSeries.max('speed') || 0) + 1}
                min={0}
                width="60"
              />
              <Charts>
                <ScatterChart
                  axis="speed"
                  columns={['speed']}
                  highlight={highlight}
                  info={infoValues}
                  infoHeight={28}
                  infoStyle={{
                    fill: 'black',
                    color: '#DDD'
                  }}
                  infoWidth={110}
                  onMouseNear={this.handleMouseNear}
                  series={metricsSeries}
                  style={this.perEventStyle}
                />
              </Charts>
            </ChartRow>
          </ChartContainer>
        </Resizable>
      </Fragment>
    );
  }
}

Metrics.propTypes = {
  classes: PropTypes.object.isRequired,
  metricsData: PropTypes.array.isRequired,
  isMining: PropTypes.bool.isRequired,
  minerIdentifier: PropTypes.string.isRequired,
  fetchMetrics: PropTypes.func.isRequired,
  isFetchingMetrics: PropTypes.bool.isRequired
};

const mapStateToProps = ({ mining: { selectedMinerIdentifier, miners } }) => {
  return {
    isMining: miners[selectedMinerIdentifier].isMining,
    metricsData: miners[selectedMinerIdentifier].metrics.data,
    minerIdentifier: selectedMinerIdentifier,
    isFetchingMetrics: miners[selectedMinerIdentifier].metrics.fetching
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchMetrics: bindActionCreators(fetchMetrics, dispatch)
  };
};

const enhance = compose(withStyles(styles), connect(mapStateToProps, mapDispatchToProps))(Metrics);
export { enhance as Metrics };
