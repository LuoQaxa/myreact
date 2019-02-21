// A extends Component 是一个类
import { ReactDOM } from './index';
function Component(props) {
  this.props = props;
  console.log('function Component run'); 
}

Component.prototype.setState = function (updateObj) {
  this.state = Object.assign({}, this.state, updateObj);
  // TODO: ???class??????????render?????????????????render
  const returnVdom = this.render();
  ReactDOM.render(
    returnVdom,
    document.getElementById('root')
  )
}

export default Component