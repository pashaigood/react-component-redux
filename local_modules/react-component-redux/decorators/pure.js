/**
 * @author PBelugin
 */
import React from 'react';
import container from './container';
import {functionName} from '../helpers/functions';

/**
 *
 * @param {React.Component} Component
 * @param {{actions: Object, state: Object, name: String}} params
 * @returns {Container}
 */
export default (Component, params) => {

  @container
  class Container extends React.PureComponent {
    state = params.state;
    actions = params.actions;

    constructor(props) {
      super(props);
      this.name = params.name || (functionName(Component));
      if (! this.name) {
        throw new Error('Component should have a name.');
      }
    }

    render() {
      return <Component {...Object.assign({}, this.props, this.state, this.actions)}/>;
    }
  }

  return Container;
};
