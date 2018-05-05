import React, { PureComponent } from 'react';

import { ActionButton } from './_ActionButton';
import { AssessmentIcon } from '../icons';
import { ExternalLink } from '../generic';
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
      <ExternalLink to={'https://google.de'}>
        <ActionButton title="Stats">
          <AssessmentIcon className={classes.icon} />
        </ActionButton>
      </ExternalLink>
    );
  }
}

StatsButton.propTypes = {
  classes: PropTypes.object.isRequired
};

const enhance = withStyles(styles)(StatsButton);
export { enhance as StatsButton };
