import '../reducers';
import {connect} from 'react-redux';

export default Component => {
  console.log(Component.prototype.actions);
  console.log(Component.actions);

  connect(Component,
    () => {},
    () => {}
  );
}
