import React, { Component } from 'react';
import { getProcessManagerPlugin, processManager } from '../../../api/plugins';

import { Button } from '../generic';

getProcessManagerPlugin();

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

export class Mining extends Component {
  state = {
    isMining: false
  };

  componentWillUnmount() {
    this._stopMining();
  }

  handleMiningClick = () => {
    const { isMining } = this.state;
    if (isMining) this._stopMining();
    else this._startMining();
  };

  _startMining = () => {
    processManager.onDataReceivedEvent.addListener(this.handleData);
    processManager.launchProcess(path, args, environmentVariables, hidden, this.handleLaunch);
    this.setState({ isMining: true });
  };

  _stopMining = () => {
    const { processId } = this.state;

    if (processId) {
      processManager.onDataReceivedEvent.removeListener(this.handleData);
      processManager.terminateProcess(processId);
    }
    this.setState({ isMining: false });
  };

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
    const { error, data, processId, isMining } = this.state;

    return (
      <div>
        <Button onClick={this.handleMiningClick}>
          {isMining ? 'Stop mining' : 'Start mining'}
        </Button>
        Error: {error}
        <br />Data: {data}
        <br />ProcessId:{processId}
      </div>
    );
  }
}
