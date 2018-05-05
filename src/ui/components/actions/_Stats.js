import React, { PureComponent } from 'react';

import { ActionButton } from './_ActionButton';
import { AssessmentIcon } from '../icons';
import PropTypes from 'prop-types';
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
    const { classes } = this.props;

    return (
      <ActionButton onClick={this.handleOpenStats} title="Stats">
        <AssessmentIcon className={classes.icon} />
      </ActionButton>
    );
  }
}

StatsButton.propTypes = {
  classes: PropTypes.object.isRequired
};

const enhance = withStyles(styles)(StatsButton);
export { enhance as StatsButton };
