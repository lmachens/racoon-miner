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
    liveMode: true
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

  render() {
    const { classes, metrics } = this.props;
    const { height, timeRange, liveMode } = this.state;

    const data = {
      name: 'metrics',
      columns: ['time', 'speed'],
      points: metrics
    };
    const series = new TimeSeries(data);

    return (
      <Fragment>
        <div className={classes.buttons}>
          <Button disabled={liveMode} onClick={this.handleLiveModeClick}>
            Live Mode
          </Button>
        </div>
        <Resizable>
          <ChartContainer
            timeRange={timeRange}
            enablePanZoom={true}
            onTimeRangeChanged={this.handleTimeRangeChanged}
          >
            <ChartRow height={height - 430}>
              <YAxis
                id="speed"
                label="Speed (Mh/s)"
                min={0}
                max={(series.max('speed') || 0) + 1}
                width="60"
                format=".2f"
              />
              <Charts>
                <ScatterChart axis="speed" series={series} columns={['speed']} />
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
  metrics: PropTypes.array.isRequired,
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
