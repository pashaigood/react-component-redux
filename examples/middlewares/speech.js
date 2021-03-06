import RCR from 'react-component-redux';
import speech from '../services/speech';
import Hello from '../components/Hello';
import TodoList from '../components/TodoList';
import _debounce from 'lodash/debounce';

const speechMiddleware = store => next => action => {
  if (! action.meta) {
    return next(action);
  }

  const {meta, payload} = action;

  switch (meta.component) {
    case Hello.component:
    {
      sayHello(store, meta.instance);
      break;
    }
    case TodoList.component: {
      switch (meta.actionName) {
        case "addItem":
        {
          const state = store.getState()[meta.instance];

          speech({text: `Вам нужно: ${state.get('name')}`});
          break;
        }
        case "toggleTodo":
        {
          const [id] = payload;
          const state = store.getState()[meta.instance];
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


const sayHello = _debounce((store, instance) => {
  const state = store.getState()[instance];
  speech({text: `Привет ${state.name} ${state.counter} раз!`});
}, 600);

RCR.middlewares.push(speechMiddleware);
