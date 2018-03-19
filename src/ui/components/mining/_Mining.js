import { Area, AreaChart, CartesianGrid, ResponsiveContainer, XAxis, YAxis } from 'recharts';
import { Button, Typography } from '../generic';
import React, { Component, Fragment } from 'react';
import { selectMiner, startMining, stopMining } from '../../../store/actions';

import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import compose from 'recompose/compose';
import { connect } from 'react-redux';
import { getMiner } from '../../../api/mining';
import { withStyles } from 'material-ui/styles';

const styles = {
  chart: {
    height: 'calc(100% - 310px)'
  }
};

class Mining extends Component {
  handleMiningClick = () => {
    const { isMining, startMining, stopMining } = this.props;
    if (isMining) stopMining();
    else startMining();
  };

  render() {
    const { classes, miner, isMining, currentSpeed, logs } = this.props;

    return (
      <Fragment>
        <Button disabled={miner.disabled} onClick={this.handleMiningClick}>
          {isMining ? 'Stop mining' : 'Start mining'}
        </Button>
        <Typography>Speed: {currentSpeed} Mh/s</Typography>
        <div className={classes.chart}>
          <ResponsiveContainer minHeight={200} minWidth={200}>
            <AreaChart data={logs.slice(0, 10).reverse()}>
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
  miner: PropTypes.object.isRequired,
  isMining: PropTypes.bool.isRequired,
  currentSpeed: PropTypes.number.isRequired,
  logs: PropTypes.array.isRequired,
  startMining: PropTypes.func.isRequired,
  stopMining: PropTypes.func.isRequired,
  selectMiner: PropTypes.func.isRequired
};

const mapStateToProps = ({
  mining: { currentMinerIdentifier, isMining, currentSpeed, logsByIdentifier }
}) => {
  return {
    isMining,
    currentSpeed,
    logs: logsByIdentifier[currentMinerIdentifier] || [],
    miner: getMiner(currentMinerIdentifier)
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
