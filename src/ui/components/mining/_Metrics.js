import {
  ChartContainer,
  ChartRow,
  Charts,
  Resizable,
  ScatterChart,
  YAxis
} from 'react-timeseries-charts';
import React, { Component } from 'react';
import { TimeRange, TimeSeries } from 'pondjs';

import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import compose from 'recompose/compose';
import { connect } from 'react-redux';
import { fetchMetrics } from '../../../store/actions';
import { withStyles } from 'material-ui/styles';

const styles = {
  chart: {
    height: 'calc(100% - 310px)'
  }
};

class Metrics extends Component {
  state = {
    height: document.body.clientHeight,
    timeRange: new TimeRange([Date.now() - 600000, Date.now()])
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
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateDimensions);
  }

  refreshMetrics = () => {
    const { fetchMetrics, minerIdentifier } = this.props;
    const { timeRange } = this.state;
    const from = timeRange.begin().getTime();
    const to = timeRange.end().getTime();
    fetchMetrics(minerIdentifier, { from, to });
  };

  handleTimeRangeChanged = timeRange => {
    this.setState({ timeRange }, this.refreshMetrics);
  };

  render() {
    const { classes, metrics, isFetchingMetrics } = this.props;
    const { height, timeRange } = this.state;

    console.log(isFetchingMetrics, metrics);
    const data = {
      name: 'metrics',
      columns: ['time', 'speed'],
      points: metrics
    };
    const series = new TimeSeries(data);

    return (
      <div className={classes.chart}>
        <Resizable>
          <ChartContainer
            timeRange={timeRange}
            enablePanZoom={true}
            onTimeRangeChanged={this.handleTimeRangeChanged}
          >
            <ChartRow height={height - 400}>
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
      </div>
    );
  }
}

Metrics.propTypes = {
  classes: PropTypes.object.isRequired,
  metrics: PropTypes.array.isRequired,
  minerIdentifier: PropTypes.string.isRequired,
  fetchMetrics: PropTypes.func.isRequired,
  isFetchingMetrics: PropTypes.bool.isRequired
};

const mapStateToProps = ({ mining: { selectedMinerIdentifier, miners } }) => {
  return {
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
