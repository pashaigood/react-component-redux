import React from 'react';
import RCR from 'react-component-redux';
import * as actions from './reducers';
import {state} from './reducers';

@RCR.container
export default class PureComponent extends React.Component {
  state = state;
  actions = actions;

  render = () => (
    <div>
      <h2>Pure</h2>
      <pre onClick={e => this.actions.random()}>
        {this.state.number || 'Click to see some random magic!'}
      </pre>
    </div>
  );
}
