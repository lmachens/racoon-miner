import { Area, AreaChart, CartesianGrid, ResponsiveContainer, XAxis, YAxis } from 'recharts';
import React, { Component, Fragment } from 'react';
import { getProcessManagerPlugin, processManager } from '../../../api/plugins';

import { Button } from '../generic';
import { ethereum } from '../../../api/mining';

getProcessManagerPlugin();

export class Mining extends Component {
  state = {
    isMining: false,
    miner: ethereum,
    miningHistory: []
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
    const hidden = true;
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

    this.setState(state => {
      const newState = {
        error,
        data
      };
      const parsed = parser(error || data);
      if (parsed) {
        newState.speed = parsed.speed;
        newState.miningHistory = [
          ...state.miningHistory,
          { name: parsed.timestamp, mhs: parsed.speed }
        ];
      }
      return newState;
    });
  };

  render() {
    const { error, data, processId, isMining, speed, miningHistory } = this.state;

    return (
      <Fragment>
        <Button onClick={this.handleMiningClick}>
          {isMining ? 'Stop mining' : 'Start mining'}
        </Button>
        <div>
          Speed: {speed} Mh/s
          <br />Error: {error}
          <br />Data: {data}
          <br />ProcessId:{processId}
        </div>
        <div style={{ height: 'calc(100% - 140px)' }}>
          <ResponsiveContainer minHeight={200} minWidth={200}>
            <AreaChart data={miningHistory}>
              <XAxis dataKey="name" />
              <YAxis />
              <CartesianGrid strokeDasharray="3 3" />
              <Area type="monotone" dataKey="mhs" stroke="#8884d8" fill="#8884d8" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </Fragment>
    );
  }
}
