import * as ActionTypes from './constants/ActionTypes';

export function registerComponent(instance, state) {
  return {
    type: ActionTypes.RCR_COMPONENT_REGISTER,
    payload: {
      instance,
      state
    }
  };
}
