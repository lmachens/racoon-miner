import { AddIcon, RemoveIcon } from '../icons';
import { IconButton, StatusCard, Typography } from '../generic';
import React, { PureComponent } from 'react';
import { addCore, removeCore } from '../../../store/actions';

import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import compose from 'recompose/compose';
import { connect } from 'react-redux';
import { getMaxCores } from '../../../api/benchmarking';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  load: {
    fontSize: '1.5rem'
  },
  remove: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    height: 24,
    width: 24
  },
  add: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    height: 24,
    width: 24
  }
};

class CpusCard extends PureComponent {
  handleAdd = () => {
    const { addCore } = this.props;
    addCore();
  };

  handleRemove = () => {
    const { removeCore } = this.props;
    removeCore();
  };

  render() {
    const { classes, cores, maxCores } = this.props;

    return (
      <StatusCard helperText="The number of cores you use for mining. This setting has no effect on ethereum mining.">
        <Typography className={classes.load} variant="display1">
          {cores}/{maxCores}
        </Typography>
        <Typography variant="caption">CPU</Typography>
        <IconButton className={classes.remove} disabled={cores === 0} onClick={this.handleRemove}>
          <RemoveIcon className={classes.helpIcon} />
        </IconButton>
        <IconButton
          className={classes.add}
          disabled={cores + 1 > maxCores}
          onClick={this.handleAdd}
        >
          <AddIcon className={classes.helpIcon} />
        </IconButton>
      </StatusCard>
    );
  }
}

CpusCard.propTypes = {
  classes: PropTypes.object.isRequired,
  cores: PropTypes.number.isRequired,
  maxCores: PropTypes.number.isRequired,
  addCore: PropTypes.func.isRequired,
  removeCore: PropTypes.func.isRequired
};

const mapStateToProps = ({
  hardwareInfo: { Cpus },
  mining: { selectedMinerIdentifier, miners }
}) => {
  const maxCores = getMaxCores(Cpus);
  const cores = miners[selectedMinerIdentifier].cores;
  return {
    cores,
    maxCores: maxCores
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addCore: bindActionCreators(addCore, dispatch),
    removeCore: bindActionCreators(removeCore, dispatch)
  };
};

const enhance = compose(
  withStyles(styles),
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(CpusCard);
export { enhance as CpusCard };
