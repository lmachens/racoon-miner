import React, { Component } from 'react';
import { Table, TableBody, TableCell, TableRow } from '../generic';
import { stopTrackingHardwareInfo, trackHardwareInfo } from '../../../store/actions';

import { CardLayout } from '../../layouts';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import get from 'lodash/get';

class Hardware extends Component {
  componentDidMount() {
    const { trackHardwareInfo } = this.props;
    trackHardwareInfo();
  }

  componentWillUnmount() {
    const { stopTrackingHardwareInfo } = this.props;
    stopTrackingHardwareInfo();
  }

  render() {
    const { hardwareInfo: { data, listening } } = this.props;
    console.log(data, listening);
    const gpus = get(data, 'Gpus.Gpus') || [];
    return (
      <CardLayout title="Hardware">
        <Table>
          <TableBody>
            <TableRow>
              <TableCell>Videocard</TableCell>
              <TableCell>{gpus.map(gpu => gpu.Name)}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardLayout>
    );
  }
}

Hardware.propTypes = {
  hardwareInfo: PropTypes.object.isRequired,
  trackHardwareInfo: PropTypes.func.isRequired,
  stopTrackingHardwareInfo: PropTypes.func.isRequired
};

const mapStateToProps = ({ hardwareInfo }) => {
  return {
    hardwareInfo
  };
};

const mapDispatchToProps = dispatch => {
  return {
    trackHardwareInfo: bindActionCreators(trackHardwareInfo, dispatch),
    stopTrackingHardwareInfo: bindActionCreators(stopTrackingHardwareInfo, dispatch)
  };
};

const HardwareWithStore = connect(mapStateToProps, mapDispatchToProps)(Hardware);
export { HardwareWithStore as Hardware };
