import React, { PureComponent } from 'react';

import { CryptoButton } from './_Crypto';
import { Grid } from '../generic';
import { MiningButton } from './_Mining';
import PropTypes from 'prop-types';
import { SettingsButton } from './_Settings';
import { StatsButton } from './_Stats';
import { SupportButton } from './_Support';
import { withStyles } from 'material-ui/styles';

const styles = {
  center: {
    justifyContent: 'center'
  }
};

class Actions extends PureComponent {
  render() {
    const { classes } = this.props;

    return (
      <Grid className={classes.center} container>
        <CryptoButton />
        <StatsButton />
        <MiningButton />
        <SettingsButton />
        <SupportButton />
      </Grid>
    );
  }
}

Actions.propTypes = {
  classes: PropTypes.object.isRequired
};

const enhance = withStyles(styles)(Actions);
export { enhance as Actions };
