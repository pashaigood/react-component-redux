import * as ActionTypes from './constants/ActionTypes';

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
        [payload.name]: module.hot && state[payload.name] ? state[payload.name] : payload.state
      }
    }
    default:
    {
      return typeof rcr[type] === 'function' ? {
        ...state,
        [meta.component]: rcr[type](state[meta.component], ...payload)
      } : state;
    }
  }
};
