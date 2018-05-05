import { Card, CardContent, CardHeader, InfoButton, Typography } from '../components/generic';

import { HelpIcon } from '../components/icons';
import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';
import { withStyles } from 'material-ui/styles';

const styles = {
  root: {
    textAlign: 'center',
    '& :last-child': {
      paddingBottom: 8
    }
  },
  header: {
    padding: '8 16 0 16'
  },
  content: {
    padding: '0 16 0 16'
  }
};

const CardLayout = ({ classes, className, helperText, children, title }) => (
  <Card className={classNames(classes.root, className)}>
    <CardHeader
      action={
        helperText && (
          <InfoButton icon popover={<Typography>{helperText}</Typography>}>
            <HelpIcon />
          </InfoButton>
        )
      }
      className={classes.header}
      subheader={title}
    />
    <CardContent className={classes.content}>{children}</CardContent>
  </Card>
);

CardLayout.propTypes = {
  helperText: PropTypes.string,
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
  title: PropTypes.string
};

const enhance = withStyles(styles)(CardLayout);
export { enhance as CardLayout };
