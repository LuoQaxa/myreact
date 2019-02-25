// A extends Component 是一个类
import { render } from './index';
function Component(props) {
  this.props = props;
  console.log('function Component run'); 
}

Component.prototype.setState = function (updateObj) {
  this.state = Object.assign({}, this.state, updateObj);
  const returnVdom = this.render();
  // 相当于这里就写死了root为container，那如果不是这个节点呢？
  render(
    returnVdom,
    document.getElementById('root')
  )
}

export default Component