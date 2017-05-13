/**
 * @author PBelugin
 */
import {registerComponent} from '../actions';
import reducers from '../reducers';
import store from '../store';
import _snakeCase from 'lodash/snakeCase';

let componentCounter = 0;

export function actionType(actionName) {
  return `${this.name}/${_snakeCase(actionName).toUpperCase()}`;
}

export function functionName(fun) {
  let ret;
  if (process.env.NODE_ENV === 'production') {
    fun.key = fun.key || componentCounter++;
    ret = `rcr${fun.key}`;
  }
  else {
    ret = fun.toString();
    ret = ret.substr('function '.length);
    ret = ret.substr(0, ret.indexOf('('));
  }

  return ret;
}

export function componentWillMount() {
  this._name = functionName(this.constructor);
  this.name = this.name || this._name + (this.props.name ? `_${this.props.name}` : '');
  this.actions = this.actions || {};
  this.rootActions = this.rootActions || {};

  store.dispatch(registerComponent(this.name, this.state));

  this.trySubscribe();
  this.registerReducers({...this.actions, ...this.rootActions});
  this.mapActions(this.actions, this.rootActions);
}

export function componentWillUnmount() {
  this.tryUnsubscribe();
  this.unRegisterReducers({...this.actions, ...this.rootActions});
}

export function handleChange() {
  const { pure = true } = this.props;

  const storeState = store.getState()[this.name];
  const prevStoreState = this.state;

  if (pure && prevStoreState === storeState) {
    return;
  }

  this.state = storeState;
  this.forceUpdate();
}

export function trySubscribe() {
  const shouldSubscribe = true;

  if (shouldSubscribe && !this.unsubscribe) {
    this.unsubscribe = store.subscribe(this.handleChange.bind(this));
    this.handleChange();
  }
}

export function tryUnsubscribe() {
  if (this.unsubscribe) {
    this.unsubscribe();
    this.unsubscribe = null;
  }
}

/**
 * Registers reducers.
 *
 * @param reducersToRegistry
 */
export function registerReducers(reducersToRegistry) {
  Object.keys(reducersToRegistry).forEach(name => {
    if (typeof reducersToRegistry[name] === 'function') {
      reducers[this.actionType(name)] = reducersToRegistry[name].bind(this);
    }
  });
}

/**
 * Removes registered reducers.
 *
 * TODO: Implement unregister of root actions.
 * @constructor
 */
export function unRegisterReducers(reducersToUnregister) {
  Object.keys(reducersToUnregister).forEach(name => {
    delete reducers[this.actionType(name)];
  });
}

/**
 * Creates action dispatchers.
 *
 * @param reducers
 * @param rootReducers
 */
export function mapActions(reducers, rootReducers) {

  let actionType = this.actionType.bind(this);
  let component = this.name;
  let name = this._name;
  const _createAction = createAction.bind(null, component, name, this.props.name);

  this.actions = Object.keys(reducers).reduce((actions, actionName) => {
    if (typeof reducers[actionName] != 'function') {
      return actions;
    }
    actions[actionName] = _createAction(actionName, actionType(actionName));
    return actions;
  }, {});

  rootReducers && Object.keys(rootReducers).map(actionName => {
    this[actionName] = _createAction(actionName, actionType(actionName));
  });
}

/**
 * Creates action dispatcher.
 *
 * @param component
 * @param name
 * @param type
 * @returns {Function}
 */
function createAction(component, name, instance, actionName, type) {
  return function (...payload) {
    return store.dispatch({
      meta: {
        actionName,
        component,
        instance,
        name
      },
      type,
      payload
    });
  };
}

export function render() {
  const {props, state, actions} = this;

  if (typeof this.view !== 'function') {
    console.warn('View should be a function.');
    return null;
  }

  return (this.view && this.view({props, state, actions, component: this})) || null;
}

/**
 *
 * @param obj
 * @returns {Array}
 */
/*
function getAllProperties(obj) {
  let allProps = [],
      curr = obj;

  do {
    console.log(curr)
    var props = Object.getOwnPropertyNames(curr);
    props.forEach(function (prop) {
      console.log(prop)
      if (allProps.indexOf(prop) === -1) {
        allProps.push(prop);
      }
    })
  } while (curr = Object.getPrototypeOf(curr));
  return allProps;
}*/
