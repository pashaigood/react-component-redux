**Redux** отличная библиотека, вот только слишком низкоуровневая для повседневного использования.

Идея в том, что бы упростить использование и сделать процесс создания компонентов как можно быстрее.

Пример:
```javascript
import React from 'react';
import RCR from 'react-component-redux';

@RCR.container
export default class Test extends React.Component {
  /**
   * Начальное состояние компонента.
   * @type {{counter: number, name: string}}
   */
  state = {
    counter: 1,
    name: 'friend',
    print: undefined
  };

  /**
   * Список действий компонента.
   * 
   * @type {{updateName: ((state, name)), doIncrement: ((state, number)), doDecrement: ((state, number))}}
   */
  actions = {
    updateName(state, name) {
      return {
        ...state,
        name
      }
    },

    doIncrement (state, number) {
      return {
        ...state,
        counter: state.counter + number
      };
    },

    doDecrement(state, number) {
      return {
        ...state,
        counter: state.counter - number
      };
    }
  };

  /**
   * Действие компонента, нозначенное как метод первого уровня.
   *
   * @param state
   * @returns {*}
   */
  @RCR.action
  printState(state) {
    state = {
      ...state,
    };
    delete state.print;
    state.print = JSON.stringify(state, null, 2);
    return state;
  }

  render() {
    const {actions, state} = this;

    return (
      <div>
        <h1>Hello {state.name} {state.counter} times!</h1>
        <div className="form-group">
          <input
            className="form-control"
            type="text"
            value={state.name}
            onChange={(event) => actions.updateName(event.target.value)}
          />
        </div>
        <button
          className="btn btn-default"
          onClick={() => actions.doIncrement(1)}>+</button>
        <button
          className="btn btn-default"
          onClick={() => actions.doDecrement(2)}>-</button>
        <button
          className="btn btn-default"
          onClick={() => this.printState()}
        >Print state</button>
        <br/>
        <br/>
        <pre>{state.print || 'Click on the print button to see current state.'}</pre>
      </div>
    );
  }
}
```

И это весть код!

Мы абстрагировались от низкого уровня управления данными, к которому всегда можем вернутся и получили **умный** компонент.

Не нужно настраивать ни хранилища, не нужно писать ни _actions_, ни _actionsCreators_, ни _reducers_.
Да конечно, этот подход не универсален, но покрывает простое использование **Redux**.
В данном подходе есть противоречия с философией чистых функций, и это вопрос обсуждаем, можно ли заменить на _договоренность_ в угоду увеличения производительности.

## Подробнее
Вот так выглядит простой набор действий:

![actions](./images/actions.jpg)

Вот так будет выглядеть действие:

```json
{
  "type": "TestComponent/DO_DECREMENT",
  "meta": {
    "component": "TestComponent"
  },
  "payload": [
    2
  ]
}
```

Самым интересным тут будет _payload_, который по сути является списком параметром, передаваемых функции _actions.doDecrement_.
