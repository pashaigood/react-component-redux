import middlewares from '../middlewares';
import {compose} from 'redux';

export default store => next => action => {
  let _dispatch = store.dispatch;

  let middlewareAPI = {
    getState: store.getState,
    dispatch: function dispatch(action) {
      return _dispatch(action);
    }
  };

  _dispatch = compose.apply(undefined, middlewares.map(middleware => middleware(middlewareAPI)))(next);
  return _dispatch(action);
};

