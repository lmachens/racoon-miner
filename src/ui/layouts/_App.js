import { AppBar, Toolbar, Typography } from '../components/generic';
import React, { Component, Fragment } from 'react';

import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';

const styles = {
  children: {
    overflow: 'auto',
    height: 'calc(100% - 64px)'
  }
};

class AppLayout extends Component {
  render() {
    const { classes, children, links, title } = this.props;

    return (
      <Fragment>
        <AppBar position="sticky" color="inherit">
          <Toolbar>
            <Typography variant="title" color="inherit">
              {title}
            </Typography>
            {links.map(link => (
              <Link key={link.title} to={link.to}>
                <Typography>{link.title}</Typography>
              </Link>
            ))}
          </Toolbar>
        </AppBar>
        <div className={classes.children}>{children}</div>
      </Fragment>
    );
  }
}

AppLayout.propTypes = {
  classes: PropTypes.object.isRequired,
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
  links: PropTypes.array.isRequired,
  title: PropTypes.string.isRequired
};

const AppLayoutWithStyles = withStyles(styles)(AppLayout);
export { AppLayoutWithStyles as AppLayout };
