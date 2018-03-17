import { Card, CardContent, Typography } from '../components/generic';

import PropTypes from 'prop-types';
import React from 'react';
import { withStyles } from 'material-ui/styles';

const styles = {
  card: {
    minWidth: 275,
    margin: '20 0'
  }
};

const CardLayout = ({ classes, children, title }) => (
  <Card className={classes.card}>
    <CardContent>
      <Typography variant="subheading">{title}</Typography>
      {children}
    </CardContent>
  </Card>
);

CardLayout.propTypes = {
  classes: PropTypes.object.isRequired,
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
  title: PropTypes.string.isRequired
};

const CardLayoutWithStyles = withStyles(styles)(CardLayout);
export { CardLayoutWithStyles as CardLayout };
