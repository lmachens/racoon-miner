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

import { Button, Typography } from '../generic';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import compose from 'recompose/compose';
import { connect } from 'react-redux';
import { fetchMetrics } from '../../../store/actions';
import { withStyles } from 'material-ui/styles';

const styles = {
  buttons: {
    display: 'flex',
    flexFlow: 'row-reverse'
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

  refreshMetrics = () => {
    const { fetchMetrics, minerIdentifier } = this.props;
    const { timeRange } = this.state;
    const from = timeRange.begin().getTime();
    const to = timeRange.end().getTime();
    fetchMetrics(minerIdentifier, { from, to });
  };

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

  render() {
    const { classes, metrics: { speed, errorMsg } } = this.props;
    const { height, timeRange, liveMode, highlight } = this.state;

    const speedData = {
      name: 'metrics',
      columns: ['time', 'speed'],
      points: speed
    };
    const speedSeries = new TimeSeries(speedData);

    const errorMsgData = {
      name: 'metrics',
      columns: ['time', 'speed', 'errorMsg'],
      points: errorMsg
    };
    const errorMsgSeries = new TimeSeries(errorMsgData);

    let text = `Speed: - mph, time: -:--`;
    let infoValues = [];
    if (highlight) {
      const speedText = `${highlight.event.get(highlight.column)} Mh/s`;
      const errorMsg = highlight.event.get('errorMsg');
      text = `
                Speed: ${speedText},
                time: ${highlight.event.timestamp().toLocaleTimeString()}
            `;
      infoValues = [{ label: 'Speed', value: speedText }, { label: 'Error', value: errorMsg }];
    }

    return (
      <Fragment>
        <div className={classes.buttons}>
          <Button disabled={liveMode} onClick={this.handleLiveModeClick}>
            Live Mode
          </Button>
        </div>
        <Typography>{text}</Typography>
        <Resizable>
          <ChartContainer
            timeRange={timeRange}
            onBackgroundClick={this.handleUnsetSelection}
            enablePanZoom={true}
            onTimeRangeChanged={this.handleTimeRangeChanged}
          >
            <ChartRow height={height - 430}>
              <YAxis
                id="speed"
                label="Speed (Mh/s)"
                min={0}
                max={(speedSeries.max('speed') || 0) + 1}
                width="60"
                format=".2f"
              />
              <Charts>
                <ScatterChart
                  axis="speed"
                  series={speedSeries}
                  columns={['speed']}
                  highlight={highlight}
                  info={infoValues}
                  infoHeight={28}
                  infoWidth={110}
                  infoStyle={{
                    fill: 'black',
                    color: '#DDD'
                  }}
                  onMouseNear={this.handleMouseNear}
                />
                <ScatterChart
                  onMouseNear={this.handleMouseNear}
                  highlight={highlight}
                  info={infoValues}
                  infoHeight={28}
                  infoWidth={110}
                  infoStyle={{
                    fill: 'black',
                    color: '#DDD'
                  }}
                  style={{ speed: { normal: { fill: 'red' } } }}
                  axis="speed"
                  series={errorMsgSeries}
                  columns={['speed']}
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
  metrics: PropTypes.object.isRequired,
  isMining: PropTypes.bool.isRequired,
  minerIdentifier: PropTypes.string.isRequired,
  fetchMetrics: PropTypes.func.isRequired,
  isFetchingMetrics: PropTypes.bool.isRequired
};

const mapStateToProps = ({ mining: { selectedMinerIdentifier, miners } }) => {
  return {
    isMining: miners[selectedMinerIdentifier].isMining,
    metrics: miners[selectedMinerIdentifier].metrics,
    minerIdentifier: selectedMinerIdentifier,
    isFetchingMetrics: miners[selectedMinerIdentifier].isFetchingMetrics
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchMetrics: bindActionCreators(fetchMetrics, dispatch)
  };
};

const enhance = compose(withStyles(styles), connect(mapStateToProps, mapDispatchToProps))(Metrics);
export { enhance as Metrics };
