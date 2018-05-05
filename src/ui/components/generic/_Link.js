import React, { Component } from 'react';

import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from 'material-ui/styles';

const styles = ({ palette }) => ({
  link: {
    textDecoration: 'none',
    '&:focus, &:hover, &:visited, &:link, &:active': {
      textDecoration: 'none',
      color: 'inherit'
    }
  },
  overwriteColor: {
    color: palette.primary.main,
    '&:focus, &:hover, &:visited, &:link, &:active': {
      color: palette.primary.main
    }
  }
});

class ExternalLink extends Component {
  handleClick = event => {
    event.preventDefault();
    const { to } = this.props;

    overwolf.utils.openUrlInDefaultBrowser(to);
  };

  render() {
    const { children, classes, to, overwriteColor = false } = this.props;
    return (
      <a
        className={classNames(classes.link, { [classes.overwriteColor]: overwriteColor })}
        href={to}
        onClick={this.handleClick}
        target="_blank"
      >
        {children}
      </a>
    );
  }
}

ExternalLink.propTypes = {
  classes: PropTypes.object.isRequired,
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
  to: PropTypes.string.isRequired,
  overwriteColor: PropTypes.bool
};

const ExternalLinkEnhanced = withStyles(styles)(ExternalLink);
export { ExternalLinkEnhanced as ExternalLink };
