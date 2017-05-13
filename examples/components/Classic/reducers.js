import * as ActionTypes from './constants/ActionTypes';

export default function (state = 'Classic', action) {

  switch (action.type) {
    case ActionTypes.CLASSIC_CHANGE: {
      return action.value;
    }
  }
  return state;
}
