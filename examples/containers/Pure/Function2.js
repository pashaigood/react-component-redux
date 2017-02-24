import React from 'react';
import RCR from 'react-component-redux';
import * as reducers from './reducers';

export default RCR.pure({
  name: 'PureFactory',
  reducers,
  view: ({number, random}) => (
    <div>
      <h2>Pure 3</h2>
      <pre onClick={() => random()}>{number || 'Click to see some random magic!'}</pre>
    </div>
  )
});
