import ButtonBase from 'material-ui/ButtonBase';
import PropTypes from 'prop-types';
import React from 'react';

const ImageButton = ({ src, imgProps, ...other }) => (
  <ButtonBase focusRipple {...other}>
    <img src={src} {...imgProps} />
  </ButtonBase>
);

ImageButton.propTypes = {
  src: PropTypes.string.isRequired,
  imgProps: PropTypes.object
};

export { ImageButton };
