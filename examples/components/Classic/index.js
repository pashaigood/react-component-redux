import React from 'react';
import {connect} from 'react-redux';
import RCR from 'react-component-redux';
import reducers from './reducers';
import * as actions from './actions';

const Style = {
  textarea: {
    top: 0,
    bottom: 0,
    overflow: 'hidden',
    position: 'absolute',
    width: '100%',
    left: '-100%',
    marginLeft: 15
  }
};

class Classic extends React.PureComponent {
  render() {
    return (
      <div style={{marginBottom: 20}}>
        <h2>Classic redux component</h2>
        <div className="row">
          <div className="col-xs-6 form-group">
          </div>
          <div className="col-xs-6">
            <textarea
              style={Style.textarea}
              className="form-control"
              type="text"
              onChange={this.props.onChange}
              value={this.props.value}
            />
            <pre style={{margin: 0}}>{this.props.value}</pre>
          </div>
        </div>
      </div>
    );
  }
}

RCR.reducers.add('ClassicRedux', reducers);

export default connect(
  (state) => {
    return {
      value: state['ClassicRedux']
    };
  },
  (dispatch) => ({
    onChange: (e) => dispatch(actions.change(e.target.value))
  })
)(Classic);


