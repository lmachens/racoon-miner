import React, { PureComponent } from 'react';

import { ActionButton } from './_ActionButton';
import { AssessmentIcon } from '../icons';
import { ExternalLink } from '../generic';
import PropTypes from 'prop-types';
import compose from 'recompose/compose';
import { connect } from 'react-redux';
import { getMiner } from '../../../api/mining';
import { withStyles } from 'material-ui/styles';

const styles = {
  icon: {
    width: 80,
    height: 80
  }
};

class StatsButton extends PureComponent {
  handleOpenStats = () => {};

  render() {
    const { address, classes, miner } = this.props;

    return (
      <ExternalLink to={miner.links.stats(address)}>
        <ActionButton title="Stats">
          <AssessmentIcon className={classes.icon} />
        </ActionButton>
      </ExternalLink>
    );
  }
}

StatsButton.propTypes = {
  address: PropTypes.string.isRequired,
  classes: PropTypes.object.isRequired,
  miner: PropTypes.object.isRequired
};

const mapStateToProps = ({ mining: { miners, selectedMinerIdentifier } }) => {
  const miner = getMiner(selectedMinerIdentifier);
  const address = miners[selectedMinerIdentifier].address;
  return {
    address,
    miner
  };
};
const enhance = compose(withStyles(styles), connect(mapStateToProps))(StatsButton);
export { enhance as StatsButton };
