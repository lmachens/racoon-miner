import { ChartContainer, ChartRow, Charts, ScatterChart, YAxis } from 'react-timeseries-charts';
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
    timeRange: new TimeRange([Date.now() - 600000, Date.now()])
  };

  componentWillMount() {
    this.refreshMetrics();
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
    const { timeRange } = this.state;

    console.log(isFetchingMetrics, metrics);
    const data = {
      name: 'metrics',
      columns: ['time', 'speed'],
      points: metrics
    };
    const series = new TimeSeries(data);

    return (
      <div className={classes.chart} onClick={this.handleClick}>
        <ChartContainer
          timeRange={timeRange}
          enablePanZoom={true}
          onTimeRangeChanged={this.handleTimeRangeChanged}
        >
          <ChartRow height="150">
            <YAxis
              id="speed"
              label="Speed (Mh/s)"
              min={0}
              max={series.max('speed') + 1}
              width="60"
              format=".2f"
            />
            <Charts>
              <ScatterChart axis="speed" series={series} columns={['speed']} />
            </Charts>
          </ChartRow>
        </ChartContainer>
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
