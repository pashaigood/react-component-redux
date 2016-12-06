**Redux** отличная библиотека, вот только слишком низкоуровневая для повседневного использования.

Идея в том, что бы упростить использование и сделать проесс создания компонентов как можно быстрее.

Пример:
```javascript
import RCR from 'react-component-redux';
import React from 'react';

class TestComponent extends RCR.Container {
  /**
   * Начальное состояние компонента.
   * @type {{counter: number, name: string}}
   */
  state = {
    counter: 1,
    name: 'World'
  };

  /**
   * Список действий компонента.
   * @type {{updateName: ((name)), doIncrement: ((number)), doDecrement: ((number))}}
   */
  actions = {
    updateName(name) {
      return {
        ...this.state,
        name
      }
    },

    doIncrement (number) {
      return {
        ...this.state,
        counter: this.state.counter + number
      };
    },

    doDecrement(number) {
      return {
        ...this.state,
        counter: this.state.counter - number
      };
    }
  };

  render() {
    const {actions, state} = this;

    return (
    <div>
      <h1>Hello {state.name} {state.counter} times!</h1>
      <div>
        <input
          type="text"
          value={state.name}
          onChange={(event) => actions.updateName(event.target.value)}
        />
      </div>
      <button onClick={() => actions.doIncrement(1)}>+</button>
      <button onClick={() => actions.doDecrement(2)}>-</button>
    </div>
    );
  }
}
```

И это весть код!

Мы обстрагировались от низкого уровня управления данными, к которому всегда можем вернутся и получили **умный** компонент.

Не нужно настраивать ни хранилища, ни нужно писать ни _actions_, ни _actionsCreators_, ни _reducers_.
Да конечно, этот подход не универсален, но покрывает простое использование **Redux**.
В данном подходе есть противоречия с филосовией чистых функций, и это вопрос обсуждаем, можно ли заменить на _договарённость_ в угоду увеличениею производительности.

## Подробнее
Вот так выглядит простой набор действий:

![actions](./images/actions.jpg)

Вот так будет выглядеть действие:

```json
{
  type: 'TestComponent/DO_DECREMENT',
  meta: {
    component: 'TestComponent'
  },
  payload: [
    2
  ]
}
```

Самым интерсным тут будет _payload_, который по сути является списком параметром, передаваемыx функции _actions.doDecrement_.
