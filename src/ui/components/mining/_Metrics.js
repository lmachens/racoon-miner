import {
  Baseline,
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
import { SpeedLimit } from './_SpeedLimit';
import { bindActionCreators } from 'redux';
import compose from 'recompose/compose';
import { connect } from 'react-redux';
import { fetchMetrics } from '../../../store/actions';
import throttle from 'lodash/throttle';
import { withStyles } from 'material-ui/styles';

const styles = {
  toolbar: {
    display: 'flex',
    marginBottom: 5,
    alignItems: 'baseline'
  },
  flexLeft: {
    flex: 1,
    textAlign: 'left'
  },
  flexRight: {
    flex: 1,
    textAlign: 'right'
  }
};

class Metrics extends Component {
  state = {
    height: document.body.clientHeight,
    timeRange: new TimeRange([Date.now() - 1800000, Date.now() + 60000]),
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
      this.setState(({ liveMode, timeRange }) => {
        if (!liveMode) return {};
        const newTimeRange = new TimeRange([
          timeRange.begin().getTime() + 10000,
          timeRange.end().getTime() + 10000
        ]);
        return {
          timeRange: newTimeRange
        };
      });
    }, 10000);
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
    const { classes, currentSpeed, metricsData } = this.props;
    const { height, timeRange, liveMode, highlight } = this.state;

    const metricsSeriesData = {
      name: 'metrics',
      columns: ['time', 'speed', 'errorMsg'],
      points: metricsData
    };
    const metricsSeries = new TimeSeries(metricsSeriesData);

    let infoValues = [];
    if (highlight) {
      const speedText = `${highlight.event.get(highlight.column).toFixed(2)} H/s`;
      const errorMsg = highlight.event.get('errorMsg');

      infoValues = [{ label: 'Speed', value: speedText }];
      if (errorMsg) infoValues.push({ label: 'Error', value: errorMsg });
    }

    return (
      <Fragment>
        <div className={classes.toolbar}>
          <div className={classes.flexLeft} />
          <div>{false && <SpeedLimit />}</div>

          <div className={classes.flexRight}>
            <Button disabled={liveMode} onClick={this.handleLiveModeClick}>
              Live Mode
            </Button>
          </div>
        </div>

        <Resizable>
          <ChartContainer
            enablePanZoom={true}
            minDuration={720000}
            onBackgroundClick={this.handleUnsetSelection}
            onTimeRangeChanged={this.handleTimeRangeChanged}
            timeRange={timeRange}
          >
            <ChartRow height={Math.max(100, height - 586)}>
              <YAxis
                format=".2f"
                id="speed"
                label="Speed (H/s)"
                max={(metricsSeries.max('speed') || 0) + 1}
                min={0}
                width="60"
              />
              <Charts>
                <Baseline
                  axis="speed"
                  label={`${currentSpeed.toFixed(2)} H/s`}
                  position="right"
                  value={currentSpeed}
                />
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
  currentSpeed: PropTypes.number.isRequired,
  metricsData: PropTypes.array.isRequired,
  isMining: PropTypes.bool.isRequired,
  minerIdentifier: PropTypes.string.isRequired,
  fetchMetrics: PropTypes.func.isRequired,
  isFetchingMetrics: PropTypes.bool.isRequired
};

const mapStateToProps = ({ mining: { selectedMinerIdentifier, miners }, activeMiners }) => {
  return {
    currentSpeed: activeMiners[selectedMinerIdentifier].currentSpeed,
    isMining: activeMiners[selectedMinerIdentifier].isMining,
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
