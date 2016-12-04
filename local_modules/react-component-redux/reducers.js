import * as ActionTypes from './constants/ActionTypes';

/**
 *
 * @param state
 * @param {{}} actions
 * @param {string} actions.type
 * @param {{}} actions.payload
 * @param {{}} actions.meta
 * @param {string} actions.meta.component
 * @returns {{}}
 */
export default function rcr(state = {}, actions) {
  const {payload, type, meta} = actions;

  switch (type) {
    case ActionTypes.RCR_COMPONENT_REGISTER:
    {
      return {
        ...state,
        [payload.name]: payload.state
      }
    }
    default:
    {
      return typeof rcr[type] === 'function' ? {
        ...state,
        [meta.component]: rcr[type](...payload, state)
      } : state;
    }
  }

  return state;
};
