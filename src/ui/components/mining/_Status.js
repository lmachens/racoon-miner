import PropTypes from 'prop-types';
import React from 'react';
import { Typography } from '../generic';
import { connect } from 'react-redux';
import { getMiner } from '../../../api/mining';

const Status = ({ miner, isMining, currentSpeed }) => {
  return (
    <Typography>
      {miner.name}: {currentSpeed} Mh/s {isMining ? 'running' : 'stopped'}
    </Typography>
  );
};

Status.propTypes = {
  miner: PropTypes.object.isRequired,
  isMining: PropTypes.bool.isRequired,
  currentSpeed: PropTypes.number.isRequired
};

const mapStateToProps = ({ mining: { currentMinerIdentifier, isMining, currentSpeed } }) => {
  return {
    isMining,
    currentSpeed,
    miner: getMiner(currentMinerIdentifier)
  };
};

const enhance = connect(mapStateToProps)(Status);
export { enhance as Status };
