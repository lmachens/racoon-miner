import React, { Component } from 'react';
import { ethereum, monero } from '../../../api/mining';
import { fetchWorkerStats, selectMiner } from '../../../store/actions';

import { ImageButton } from '../generic';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import classNames from 'classnames';
import compose from 'recompose/compose';
import { connect } from 'react-redux';
import debounce from 'lodash/debounce';
import { withStyles } from 'material-ui/styles';

const styles = {
  imageButton: {
    margin: '0 5'
  },
  image: {
    height: 70
  },
  inactive: {
    opacity: 0.25
  }
};

class Miner extends Component {
  handleClick = event => {
    const { selectMiner } = this.props;
    const minerIdentifier = event.currentTarget.getAttribute('data-miner-identifier');
    selectMiner(minerIdentifier);

    this.updateWorkerStats(minerIdentifier);
  };

  updateWorkerStats = debounce(minerIdentifier => {
    const { fetchWorkerStats } = this.props;

    fetchWorkerStats(minerIdentifier);
  }, 1000);

  render() {
    const { classes, selectedMinerIdentifier } = this.props;

    return (
      <div>
        {[ethereum, monero].map(miner => (
          <ImageButton
            className={classNames(classes.imageButton, {
              [classes.inactive]: selectedMinerIdentifier !== miner.identifier
            })}
            data-miner-identifier={miner.identifier}
            imgProps={{
              className: classes.image
            }}
            key={miner.name}
            onClick={this.handleClick}
            src={miner.logo}
          />
        ))}
      </div>
    );
  }
}

Miner.propTypes = {
  classes: PropTypes.object.isRequired,
  selectedMinerIdentifier: PropTypes.string.isRequired,
  fetchWorkerStats: PropTypes.func.isRequired,
  selectMiner: PropTypes.func.isRequired
};

const mapStateToProps = ({ mining: { selectedMinerIdentifier } }) => {
  return {
    selectedMinerIdentifier
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchWorkerStats: bindActionCreators(fetchWorkerStats, dispatch),
    selectMiner: bindActionCreators(selectMiner, dispatch)
  };
};

const enhance = compose(withStyles(styles), connect(mapStateToProps, mapDispatchToProps))(Miner);
export { enhance as Miner };
