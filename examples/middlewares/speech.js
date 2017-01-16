import RCR from 'react-component-redux';
import speech from '../services/speech';
import Hello from '../containers/Hello';
import TodoList from '../containers/TodoList';
import _debounce from 'lodash/debounce';

const speechMiddleware = store => next => action => {
  if (! action.meta) {
    return next(action);
  }

  const {meta, payload} = action;

  switch (meta.name) {
    case Hello.name:
    {
      sayHello(store, meta.component);
      break;
    }
    case TodoList.name: {
      switch (meta.actionName) {
        case "addItem":
        {
          const state = store.getState()[meta.component];

          speech({text: `Вам нужно: ${state.get('name')}`});
          break;
        }
        case "toggleTodo":
        {
          const [id] = payload;
          const state = store.getState()[meta.component];
          const item = state.get('todos').find(item => item.get('id') == id);

          speech({text: `Вы ${item.get('done') ? 'не' : ''} сделаи: ${item.get('name')}`})
          break;
        }

      }
      break;
    }
  }

  return next(action);
};


const sayHello = _debounce((store, component) => {
  const state = store.getState()[component];
  speech({text: `Привет ${state.name} ${state.counter} раз!`});
}, 600);

RCR.middlewares.push(speechMiddleware);
