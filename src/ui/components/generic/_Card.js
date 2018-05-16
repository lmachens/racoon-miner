import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import { HelpIcon } from '../icons';
import { InfoButton } from './_InfoButton';
import PropTypes from 'prop-types';
import React from 'react';
import { Typography } from './_Typography';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';

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

const StatusCard = ({ classes, className, helperText, children, title }) => (
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

StatusCard.propTypes = {
  helperText: PropTypes.string,
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
  title: PropTypes.string
};

const enhance = withStyles(styles)(StatusCard);
export { enhance as StatusCard };
