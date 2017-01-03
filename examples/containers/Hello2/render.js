/**
 * @author PBelugin
 */
import React from 'react';

export default function () {
  const {state, actions} = this;

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
        onClick={() => actions.doIncrement(1)}>+
      </button>
      <button
        className="btn btn-default"
        onClick={() => actions.doDecrement(2)}>-
      </button>
      <button
        className="btn btn-default"
        onClick={() => this.printState()}
      >Print state
      </button>
      <br/>
      <br/>
      <pre>{state.print || 'Click on the print button to see current state.'}</pre>
    </div>
  )
}
