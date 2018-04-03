import PropTypes from 'prop-types';
import React from 'react';
import { Typography } from '../components/generic';
import { withStyles } from 'material-ui/styles';

const styles = {
  wrapper: {
    margin: 20
  },
  children: {
    marginTop: 10,
    textAlign: 'center'
  }
};

const PageLayout = ({ classes, children, title }) => (
  <div className={classes.wrapper}>
    {title && <Typography variant="headline">{title}</Typography>}
    <div className={classes.children}>{children}</div>
  </div>
);

PageLayout.propTypes = {
  classes: PropTypes.object.isRequired,
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
  title: PropTypes.string
};

const enhance = withStyles(styles)(PageLayout);
export { enhance as PageLayout };
