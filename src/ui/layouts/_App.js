import { AppBar, Button, Link, Toolbar, Typography } from '../components/generic';
import React, { Fragment } from 'react';

import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';

const styles = {
  children: {
    overflow: 'auto',
    height: 'calc(100% - 64px)'
  }
};

const AppLayout = ({ classes, children, links, title }) => (
  <Fragment>
    <AppBar position="sticky" color="inherit">
      <Toolbar>
        <Typography variant="title" color="inherit">
          {title}
        </Typography>
        {links.map(link => (
          <Link key={link.title} to={link.to}>
            <Button>{link.title}</Button>
          </Link>
        ))}
      </Toolbar>
    </AppBar>
    <div className={classes.children}>{children}</div>
  </Fragment>
);

AppLayout.propTypes = {
  classes: PropTypes.object.isRequired,
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
  links: PropTypes.array.isRequired,
  title: PropTypes.string.isRequired
};

const enhance = withStyles(styles)(AppLayout);
export { enhance as AppLayout };
