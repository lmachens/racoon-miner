import PropTypes from 'prop-types';
import React from 'react';
import { Link as ReactRouterLink } from 'react-router-dom';
import { withStyles } from 'material-ui/styles';

const styles = {
  link: {
    textDecoration: 'none',
    '&:focus, &:hover, &:visited, &:link, &:active': {
      textDecoration: 'none'
    }
  }
};

const Link = ({ classes, children, ...other }) => (
  <ReactRouterLink className={classes.link} {...other}>
    {children}
  </ReactRouterLink>
);

Link.propTypes = {
  classes: PropTypes.object.isRequired,
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired
};

const enhanced = withStyles(styles)(Link);
export { enhanced as Link };
