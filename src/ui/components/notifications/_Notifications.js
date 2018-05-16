import React, { PureComponent } from 'react';

import PropTypes from 'prop-types';
import { Typography } from '../generic';
import compose from 'recompose/compose';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  container: {
    margin: 16
  }
};

class Notifications extends PureComponent {
  render() {
    const { classes } = this.props;

    return (
      <div className={classes.container}>
        <Typography>I want to display alerts and other Notifications here</Typography>
      </div>
    );
  }
}

Notifications.propTypes = {
  classes: PropTypes.object.isRequired,
  notifications: PropTypes.object
};

const mapStateToProps = ({ notifications }) => {
  return {
    notifications
  };
};

const enhance = compose(withStyles(styles), connect(mapStateToProps))(Notifications);
export { enhance as Notifications };
