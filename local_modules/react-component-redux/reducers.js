import * as ActionTypes from './constants/ActionTypes';
import {registerComponent} from './actions';

export const Additional = {
  add(name, func) {
    Additional[name] = func;
    require('./store').default.dispatch(registerComponent(name, func(void 0, {type: '@@INIT'})));
  }
};

/**
 *
 * @param state
 * @param {{}} action
 * @param {string} action.type
 * @param {{}} action.payload
 * @param {{}} action.meta
 * @param {string} action.meta.component
 * @returns {{}}
 */
export default function rcr(state = {}, action) {
  const {payload, type, meta} = action;

  switch (type) {
    case ActionTypes.RCR_COMPONENT_REGISTER:
    {
      return {
        ...state,
        [payload.instance]: state[payload.instance] !== void 0 ? state[payload.instance] : payload.state
      };
    }
    default:
    {
      if (meta !== void 0) {
        return typeof rcr[type] === 'function' ? {
          ...state,
          [meta.instance]: rcr[type](state[meta.instance], ...payload)
        } : state;
      }
      else {
        return Object.keys(Additional).reduce((state, key) => {
          if (key !== 'add') {
            state[key] = Additional[key](state[key], action);
          }
          return state;
        }, {...state});
      }
    }
  }
};
