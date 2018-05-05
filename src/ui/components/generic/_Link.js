import React, { Component } from 'react';

import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';

const styles = {
  link: {
    textDecoration: 'none',
    '&:focus, &:hover, &:visited, &:link, &:active': {
      textDecoration: 'none'
    }
  }
};

class ExternalLink extends Component {
  handleClick = event => {
    event.preventDefault();
    const { to } = this.props;

    overwolf.utils.openUrlInDefaultBrowser(to);
  };

  render() {
    const { children, classes, to } = this.props;
    return (
      <a className={classes.link} href={to} onClick={this.handleClick} target="_blank">
        {children}
      </a>
    );
  }
}

ExternalLink.propTypes = {
  classes: PropTypes.object.isRequired,
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
  to: PropTypes.string.isRequired
};

const ExternalLinkEnhanced = withStyles(styles)(ExternalLink);
export { ExternalLinkEnhanced as ExternalLink };
