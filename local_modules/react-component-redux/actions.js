import * as ActionTypes from './constants/ActionTypes';

export function registerComponent(name, state) {
  return {
    type: ActionTypes.RCR_COMPONENT_REGISTER,
    payload: {
      name,
      state
    }
  };
}
