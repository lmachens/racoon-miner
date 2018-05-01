import PropTypes from 'prop-types';
import React from 'react';
import { Typography } from '../generic';
import { connect } from 'react-redux';
import { getMiner } from '../../../api/mining';

const Status = ({ name, isMining, currentSpeed }) => {
  return (
    <Typography>
      {name}: {currentSpeed} H/s {isMining ? 'running' : 'stopped'}
    </Typography>
  );
};

Status.propTypes = {
  minerIdentifier: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  isMining: PropTypes.bool.isRequired,
  currentSpeed: PropTypes.number.isRequired
};

const mapStateToProps = ({ activeMiners }, { minerIdentifier }) => {
  return {
    isMining: activeMiners[minerIdentifier].isMining,
    currentSpeed: activeMiners[minerIdentifier].currentSpeed,
    name: getMiner(minerIdentifier).name
  };
};

const enhance = connect(mapStateToProps)(Status);
export { enhance as Status };
