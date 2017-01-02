import React from 'react';
import '../reducers';
import '../components/Container';
import * as functions from '../helpers/functions';

export default Component => {

  Object.assign(Component.prototype, functions);

  return class Container extends React.Component {
    static propTypes = Component.propTypes;

    render() {
      return <Component {...this.props}/>;
    }
  }
}

