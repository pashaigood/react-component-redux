import React from 'react';
import {connect} from 'react-redux';
import RCR from 'react-component-redux';
import reducers from './reducers';
import * as actions from './actions';

class Classic extends React.PureComponent {
  render() {
    console.log('Render')
    return (
      <div>
        <input
          type="text"
          onChange={this.props.onChange}
          value={this.props.value}
        />
      </div>
    );
  }
}

RCR.reducers.add('ClassicRedux', reducers);

export default connect(
  (state) => {
    console.log('Change')
    return {
      value: state['ClassicRedux']
    };
  },
  (dispatch) => ({
    onChange: (e) => dispatch(actions.change(e.target.value))
  })
)(Classic);


