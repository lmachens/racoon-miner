import { AppBar, Button, Link, Toolbar, Typography } from '../components/generic';
import { ETHEREUM_MINER, MONERO_MINER } from '../../api/mining';
import React, { Fragment } from 'react';

import PropTypes from 'prop-types';
import { Status } from '../components/mining';
import { withStyles } from 'material-ui/styles';

const styles = {
  children: {
    overflow: 'auto',
    height: 'calc(100% - 64px)'
  },
  flex: {
    marginLeft: 4,
    flex: 1
  }
};

const AppLayout = ({ classes, children, links, title }) => (
  <Fragment>
    <AppBar color="inherit" position="sticky">
      <Toolbar>
        <Typography color="inherit" variant="title">
          {title}
        </Typography>
        <div className={classes.flex}>
          {links.map(link => (
            <Link key={link.title} to={link.to}>
              <Button>{link.title}</Button>
            </Link>
          ))}
        </div>
        <div>
          <Status minerIdentifier={ETHEREUM_MINER} />
          <br />
          <Status minerIdentifier={MONERO_MINER} />
        </div>
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
