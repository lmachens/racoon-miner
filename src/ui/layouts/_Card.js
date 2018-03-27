import { Card, CardContent, Typography } from '../components/generic';

import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';
import { withStyles } from 'material-ui/styles';

const styles = {
  card: {
    minWidth: 275,
    margin: '20 0'
  }
};

const CardLayout = ({ classes, className, children, title }) => (
  <Card className={classNames(classes.card, className)}>
    <CardContent>
      <Typography variant="subheading">{title}</Typography>
      {children}
    </CardContent>
  </Card>
);

CardLayout.propTypes = {
  classes: PropTypes.object.isRequired,
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
  className: PropTypes.string,
  title: PropTypes.string.isRequired
};

const enhance = withStyles(styles)(CardLayout);
export { enhance as CardLayout };
