import React, { Component } from 'react';
import { Table, TableBody, TableCell, TableRow } from '../generic';

import { CardLayout } from '../../layouts';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import get from 'lodash/get';

class Hardware extends Component {
  render() {
    const {
      hardwareInfo: { data, isListening }
    } = this.props;
    console.log(data, isListening);
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

const enhance = connect(mapStateToProps)(Hardware);
export { enhance as Hardware };
