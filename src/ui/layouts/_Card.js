import { Card, CardActions, CardContent, Typography } from '../components/generic';

import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';
import { withStyles } from 'material-ui/styles';

const styles = {
  card: {
    minWidth: 275,
    margin: '20 0'
  },
  actions: {
    justifyContent: 'center',
    marginTop: -20
  }
};

const CardLayout = ({ actions, classes, className, children, title }) => (
  <Card className={classNames(classes.card, className)}>
    <CardContent>
      <Typography gutterBottom variant="title">
        {title}
      </Typography>
      {children}
    </CardContent>
    {actions && <CardActions className={classes.actions}>{actions}</CardActions>}
  </Card>
);

CardLayout.propTypes = {
  actions: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
  classes: PropTypes.object.isRequired,
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
  className: PropTypes.string,
  title: PropTypes.string.isRequired
};

const enhance = withStyles(styles)(CardLayout);
export { enhance as CardLayout };
