import React from 'react';
import '../reducers';
import '../components/Container';
import * as functions from '../helpers/functions';
import _omit from 'lodash/omit';

export default function (Component) {

  Object.assign(Component.prototype, _omit(functions, ['render']));
  if (! Component.prototype.render) {
    Component.prototype.render = functions.render;
  }

  class Container extends React.Component {
    render() {
      return <Component {...this.props}/>;
    }
  }

  Container.propTypes = Component.propTypes;
  return Container;
}

