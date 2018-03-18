import { Area, AreaChart, CartesianGrid, ResponsiveContainer, XAxis, YAxis } from 'recharts';
import React, { Component, Fragment } from 'react';
import { selectMiner, startMining, stopMining } from '../../../store/actions';

import { Button } from '../generic';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import compose from 'recompose/compose';
import { connect } from 'react-redux';
import { withStyles } from 'material-ui/styles';

const styles = {
  chart: {
    height: 'calc(100% - 140px)'
  }
};

class Mining extends Component {
  handleMiningClick = () => {
    const { mining: { isMining }, startMining, stopMining } = this.props;
    if (isMining) stopMining();
    else startMining();
  };

  render() {
    const { classes, mining: { isMining, currentSpeed, history } } = this.props;

    return (
      <Fragment>
        <Button onClick={this.handleMiningClick}>
          {isMining ? 'Stop mining' : 'Start mining'}
        </Button>
        <div>Speed: {currentSpeed} Mh/s</div>
        <div className={classes.chart}>
          <ResponsiveContainer minHeight={200} minWidth={200}>
            <AreaChart data={history.slice(0, 10).reverse()}>
              <XAxis dataKey="timestamp" />
              <YAxis />
              <CartesianGrid strokeDasharray="3 3" />
              <Area type="monotone" dataKey="speed" stroke="#8884d8" fill="#8884d8" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </Fragment>
    );
  }
}

Mining.propTypes = {
  classes: PropTypes.object.isRequired,
  mining: PropTypes.object.isRequired,
  startMining: PropTypes.func.isRequired,
  stopMining: PropTypes.func.isRequired,
  selectMiner: PropTypes.func.isRequired
};

const mapStateToProps = ({ mining }) => {
  return {
    mining
  };
};

const mapDispatchToProps = dispatch => {
  return {
    startMining: bindActionCreators(startMining, dispatch),
    stopMining: bindActionCreators(stopMining, dispatch),
    selectMiner: bindActionCreators(selectMiner, dispatch)
  };
};

const enhance = compose(withStyles(styles), connect(mapStateToProps, mapDispatchToProps))(Mining);
export { enhance as Mining };
