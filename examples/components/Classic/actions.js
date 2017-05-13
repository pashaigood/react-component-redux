import * as ActionTypes from './constants/ActionTypes';

export function change(value) {
  return {
    type: ActionTypes.CLASSIC_CHANGE,
    value
  };
}
