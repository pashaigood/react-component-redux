/**
 * @author PBelugin
 */
import React from 'react';
import container from './container';
import {functionName} from '../helpers/functions';

/**
 *
 * @param {React.Component} Component
 * @param {{actions: Object, state: Object, name: String, reducers: String, view: Function}} params
 * @returns {Container}
 */
export default function (Component, params) {

  if (! arguments[1]) {
    params = Component;
    Component = params.view;
    delete params.view;
  }

  const state = params.state || params.reducers.state;
  const actions = params.actions || params.reducers;

  @container
  class Container extends React.PureComponent {
    state = state;
    actions = actions;

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
