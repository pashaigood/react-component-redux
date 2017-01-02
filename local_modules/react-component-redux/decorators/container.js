import React from 'react';
import '../reducers';
import '../components/Container';
import * as functions from '../helpers/functions';

export default function (Component) {

  Object.assign(Component.prototype, functions);

  class Container extends React.Component {
    render() {
      return <Component {...this.props}/>;
    }
  }

  Container.propTypes = Component.propTypes;
  return Container;
}

