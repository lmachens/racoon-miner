import React, { Component } from 'react';
import { ethereum, monero } from '../../../api/mining';

import { ImageButton } from '../generic';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import classNames from 'classnames';
import compose from 'recompose/compose';
import { connect } from 'react-redux';
import { selectMiner } from '../../../store/actions';
import { withStyles } from 'material-ui/styles';

const styles = {
  image: {
    height: 80
  },
  inactive: {
    opacity: 0.25
  }
};

class Miner extends Component {
  handleClick = event => {
    const { selectMiner } = this.props;
    const miningIdentifier = event.currentTarget.getAttribute('data-mining-identifier');
    selectMiner(miningIdentifier);
  };

  render() {
    const { classes, currentMinerIdentifier } = this.props;

    return (
      <div>
        {[ethereum, monero].map(miner => (
          <ImageButton
            key={miner.name}
            src={miner.logo}
            onClick={this.handleClick}
            data-mining-identifier={miner.identifier}
            className={classNames({
              [classes.inactive]: currentMinerIdentifier !== miner.identifier
            })}
            imgProps={{
              className: classes.image
            }}
          />
        ))}
      </div>
    );
  }
}

Miner.propTypes = {
  classes: PropTypes.object.isRequired,
  currentMinerIdentifier: PropTypes.string.isRequired,
  selectMiner: PropTypes.func.isRequired
};

const mapStateToProps = ({ mining: { currentMinerIdentifier } }) => {
  return {
    currentMinerIdentifier
  };
};

const mapDispatchToProps = dispatch => {
  return {
    selectMiner: bindActionCreators(selectMiner, dispatch)
  };
};

const enhance = compose(withStyles(styles), connect(mapStateToProps, mapDispatchToProps))(Miner);
export { enhance as Miner };
