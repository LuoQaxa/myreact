// A extends Component 是一个类
// import { render } from './index';
import { renderComponent } from './render'

function Component(props) {
  // debugger
  this.props = props || {};
  this.state = this.state || {}
  // console.log('function Component run'); 
}

Component.prototype.setState = function (updateObj) {
  this.state = Object.assign({}, this.state, updateObj);
  // const returnVdom = this.render();
  // 相当于这里就写死了root为container，那如果不是这个节点呢？
  // render(
  //   returnVdom,
  //   document.getElementById('root')
  // )
  // 传入component
  renderComponent(this);
}

export default Component