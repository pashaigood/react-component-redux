import React from 'react';
import RCR from 'react-component-redux';
import * as reducers from  './reducers';

function PureFunction({number, random}) {
  return (
    <div>
      <h2>Pure 2</h2>
      <pre onClick={e => random()}>{number || 'Click to see some random magic!'}</pre>
    </div>
  );
}

export default RCR.pure(PureFunction, {reducers});
