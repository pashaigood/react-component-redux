import Container from './components/Container';
import store from './store';
import container from './decorators/container';
import action from './decorators/action';


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
  container,
  action,
  Container,
  Component: Container,
  /**
   * Default store.
   */
  store
};
