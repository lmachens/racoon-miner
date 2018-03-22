import { Area, AreaChart, CartesianGrid, ResponsiveContainer, XAxis, YAxis } from 'recharts';
import React, { Component } from 'react';

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
    range: {}
  };

  handleClick = () => {
    const { fetchMetrics, minerIdentifier } = this.props;
    const { range } = this.state;
    fetchMetrics(minerIdentifier, range);
  };

  render() {
    const { classes, metrics, isFetchingMetrics } = this.props;
    console.log(isFetchingMetrics, metrics);
    return (
      <div className={classes.chart} onClick={this.handleClick}>
        <ResponsiveContainer minHeight={200} minWidth={200}>
          <AreaChart data={metrics}>
            <XAxis dataKey="timestamp" />
            <YAxis />
            <CartesianGrid strokeDasharray="3 3" />
            <Area type="monotone" dataKey="speed" stroke="#8884d8" fill="#8884d8" />
          </AreaChart>
        </ResponsiveContainer>
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
