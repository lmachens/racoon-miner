import { Typography } from '../generic';
import React, { Component } from 'react';
import { withStyles } from 'material-ui/styles';
import compose from 'recompose/compose';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const styles = {
  stats: {
    display: 'flex',
    textAlign: 'center'
  },
  item: {
    flex: 1
  }
};

class Stats extends Component {
  render() {
    const { classes, currentSpeed, shards, coins } = this.props;

    return (
      <div className={classes.stats}>
        <Typography className={classes.item}>Speed: {currentSpeed} Mh/s</Typography>
        <Typography className={classes.item}>Shards: {shards}</Typography>
        <Typography className={classes.item}>Coins: {coins}</Typography>
      </div>
    );
  }
}

Stats.propTypes = {
  classes: PropTypes.object.isRequired,
  currentSpeed: PropTypes.number.isRequired,
  shards: PropTypes.number.isRequired,
  coins: PropTypes.number.isRequired
};

const mapStateToProps = ({ mining: { selectedMinerIdentifier, miners } }) => {
  return {
    currentSpeed: miners[selectedMinerIdentifier].currentSpeed,
    shards: miners[selectedMinerIdentifier].shards,
    coins: miners[selectedMinerIdentifier].coins
  };
};

const enhance = compose(withStyles(styles), connect(mapStateToProps))(Stats);
export { enhance as Stats };
