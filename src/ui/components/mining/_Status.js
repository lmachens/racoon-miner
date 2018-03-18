import PropTypes from 'prop-types';
import React from 'react';
import { Typography } from '../generic';
import { connect } from 'react-redux';
import { getMiner } from '../../../api/mining';

const Status = ({ currentMinerIdentifier, isMining, currentSpeed }) => {
  const miner = getMiner(currentMinerIdentifier);
  return (
    <Typography>
      {miner.name}: {currentSpeed} Mh/s {isMining ? 'running' : 'stopped'}
    </Typography>
  );
};

Status.propTypes = {
  currentMinerIdentifier: PropTypes.string.isRequired,
  isMining: PropTypes.bool.isRequired,
  currentSpeed: PropTypes.number.isRequired
};

const mapStateToProps = ({ mining: { currentMinerIdentifier, isMining, currentSpeed } }) => {
  return {
    currentMinerIdentifier,
    isMining,
    currentSpeed
  };
};

const enhance = connect(mapStateToProps)(Status);
export { enhance as Status };
