import React from 'react';
import RCR from 'react-component-redux';

/**
 * @author PBelugin
 */
@RCR.container
export default class MultiInstance extends React.Component {
  static propTypes = {
    title: React.PropTypes.string
  };

  state = {
    text: ''
  };

  @RCR.action
  changeName(state, text) {
    return {
      ...state,
      text
    }
  }

  render() {
    const {title} = this.props;
    const {text} = this.state;

    return (
      <div>
        <h2>{title}</h2>
        <textarea
          className="form-control"
          value={text}
          onChange={e => this.changeName(e.target.value)}
        />
        <br/>
        <br/>
        <pre>{text || 'Type somth...'}</pre>
      </div>
    );

  }
}
