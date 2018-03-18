import { Discord } from '../components/support';
import { PageLayout } from '../layouts';
import PropTypes from 'prop-types';
import React from 'react';
import { withStyles } from 'material-ui/styles';

const styles = {
  discord: {
    height: 'calc(100% - 82px)'
  }
};

const SupportPage = ({ classes }) => (
  <PageLayout title="Support">
    <div className={classes.discord}>
      <Discord />
    </div>
  </PageLayout>
);

SupportPage.propTypes = {
  classes: PropTypes.object.isRequired
};

const SupportPageWithStyles = withStyles(styles)(SupportPage);
export { SupportPageWithStyles as SupportPage };
