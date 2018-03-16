import React, { Component } from 'react';
import { getProcessManagerPlugin, processManager } from '../../../api/plugins';

import { Button } from '../generic';
import { ethereum } from '../../../api/mining';

getProcessManagerPlugin();

const hidden = true;

export class Mining extends Component {
  state = {
    isMining: false,
    miner: ethereum
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
    const { miner: { path, args, environmentVariables } } = this.state;

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
    const { miner: { parser } } = this.state;

    const parsed = parser(error || data);

    this.setState({
      error,
      data,
      ...parsed
    });
  };

  render() {
    const { error, data, processId, isMining, speed } = this.state;

    return (
      <div>
        <Button onClick={this.handleMiningClick}>
          {isMining ? 'Stop mining' : 'Start mining'}
        </Button>
        <div>
          Speed: {speed} Mh/s
          <br />Error: {error}
          <br />Data: {data}
          <br />ProcessId:{processId}
        </div>
      </div>
    );
  }
}
