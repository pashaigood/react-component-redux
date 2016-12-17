import React from 'react';
import * as ActionTypes from '../constants/ActionTypes';
import store from '../store';
import reducers from '../reducers';
import _snakeCase from 'lodash/snakeCase';

let errorObject = { value: null };
function tryCatch(fn, ctx) {
  try {
    return fn.apply(ctx);
  } catch (e) {
    errorObject.value = e;
    return errorObject;
  }
}


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
    this.actions = {};

    this.store = store;
    this.name = this.constructor.name;
  }

  actionType(name) {
    return `${this.name}/${_snakeCase(name).toUpperCase()}`
  }

  componentWillMount() {
    store.dispatch({
      type: ActionTypes.RCR_COMPONENT_REGISTER,
      payload: {
        name: this.name,
        state: this.state
      }
    });

    this.trySubscribe();
    this.registerReducers();
    this.mapActions();
  }

  componentWillUnmount() {
    this.tryUnsubscribe();
    this.UnRegisterReducers();
    this.clearCache();
  }

  trySubscribe() {
    const shouldSubscribe = true;

    if (shouldSubscribe && !this.unsubscribe) {
      this.unsubscribe = this.store.subscribe(this.handleChange.bind(this));
      this.handleChange();
    }
  }

  mapActions() {
    this.actions = Object.keys(this.actions).reduce((actions, name) => {

      actions[name] = (function (...payload) {
        return store.dispatch({
          type: this.actionType(name),
          meta: {
            component: this.name
          },
          payload
        });
      }).bind(this);

      return actions;
    }, {});
  }

  registerReducers() {
    Object.keys(this.actions).forEach(name => {
      reducers[this.actionType(name)] = this.actions[name].bind(this);
    });
  }

  UnRegisterReducers() {
    Object.keys(this.actions).forEach(name => {
      delete reducers[this.actionType(name)];
    });
  }

  tryUnsubscribe() {
    if (this.unsubscribe) {
      this.unsubscribe();
      this.unsubscribe = null;
    }
  }

  isSubscribed() {
    return typeof this.unsubscribe === 'function';
  }

  handleChange() {
    const { pure = true, withRef = false } = this.props;

    const storeState = this.store.getState()[this.name];
    const prevStoreState = this.state;

    if (pure && prevStoreState === storeState) {
      return;
    }

    this.state = storeState;
    this.forceUpdate();
  }

  clearCache() {
    this.dispatchProps = null;
    this.stateProps = null;
    this.mergedProps = null;
    this.haveOwnPropsChanged = true;
    this.hasStoreStateChanged = true;
    this.haveStatePropsBeenPrecalculated = false;
    this.statePropsPrecalculationError = null;
    this.renderedElement = null;
    this.finalMapDispatchToProps = null;
    this.finalMapStateToProps = null;
  }
}


export default Container;
