import Container from './components/Container';
import store from './store';
import container from './decorators/container';
import action from './decorators/action';
import pure from './decorators/pure';
import middlewares from './middlewares';


// /**
//  * @alias RCR
//  * @kind module
//  * @typicalname RCR
//  */

/**
 * @author PBelugin
 * @module react-component-redux
 * @typicalname RCR
 * @example import RCR from 'react-component-redux';
 */
export default {
  // Decorators

  container,
  action,
  pure,

  // Parents

  Container,
  Component: Container,
  /**
   * Default store.
   */
  store,

  middlewares
};
