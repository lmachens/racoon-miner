import React, { Component } from 'react';

import { processManager } from '../../../api/plugins';

const path = 'ethminer.exe';
const args =
  '--farm-recheck 200 -G -S eu1.ethermine.org:4444 -FS us1.ethermine.org:4444 -O 0x799db2f010a5a9934eca801c5d702a7d96373b9d.XIGMA';
const environmentVariables = JSON.stringify({
  GPU_FORCE_64BIT_PTR: '0',
  GPU_MAX_HEAP_SIZE: '100',
  GPU_USE_SYNC_OBJECTS: '1',
  GPU_MAX_ALLOC_PERCENT: '100',
  GPU_SINGLE_ALLOC_PERCENT: '100'
});
const hidden = true;

export class Miner extends Component {
  state = {};

  componentDidMount() {
    processManager.onDataReceivedEvent.addListener(this.handleData);

    processManager.launchProcess(path, args, environmentVariables, hidden, this.handleLaunch);
  }

  componentWillUnmount() {
    const { processId } = this.state;

    if (processId) processManager.terminateProcess(processId);
  }

  handleLaunch = ({ error, data }) => {
    this.setState({ error, processId: data });
  };

  handleData = ({ error, data }) => {
    if (error) {
      console.error(error);
    }
    if (data) {
      console.log(data);
    }
    this.setState({
      error,
      data
    });
  };

  render() {
    const { error, data, processId } = this.state;

    return (
      <div>
        Error: {error}
        <br />Data: {data}
        <br />ProcessId:{processId}
      </div>
    );
  }
}
