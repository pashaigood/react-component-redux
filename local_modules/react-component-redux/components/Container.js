import React from 'react';
import * as functions from '../helpers/functions';

/**
 * Root "smart" container for RCR app.
 * @class
 * @memberOf module:react-component-redux
 * @extends React.Component
 */
class Container extends React.Component {

  /**
   * Construct new  RCR component
   *
   * @constructor
   * @param {Object} props
   */
  constructor(props) {
    super(props);

    this.state = {};
  }

  // TODO: Add cheking for hot reloading.
  componentWillUpdate() {

    // TODO: Make reload only if necessary.
    if (module.hot) {
      const ReactComponent = this.constructor;
      const actions = (new ReactComponent).actions;

      this.unRegisterReducers({...this.actions, ...this.rootActions});
      this.actions = actions;
      this.registerReducers({...this.actions, ...this.rootActions});
      this.mapActions(this.actions, this.rootActions);
    }

  }
}

Object.assign(Container.prototype, functions);

export default Container;
