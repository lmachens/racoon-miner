import { AppBar, Toolbar, Typography } from '../components/generic';
import React, { Component, Fragment } from 'react';

import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

export class AppLayout extends Component {
  render() {
    const { children, links, title } = this.props;

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
        {children}
      </Fragment>
    );
  }
}

AppLayout.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
  links: PropTypes.array.isRequired,
  title: PropTypes.string.isRequired
};
