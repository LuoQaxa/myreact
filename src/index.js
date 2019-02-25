
import { humpToStandard } from './util';
import Component from './Component';
import createElement from './createElement';
import { render } from './render';

const React = {
  createElement,
  Component
}

const element = (
  <div style={{ color: 'green', fontSize: '25px' }}>
    <div> 
       hello react jsx
    </div>
  </div>
)

// 在经过babel转化后的js代码为
// var element = React.createElement("div", {
//   style: {
//     color: 'green',
//     fontSize: '25px'
//   }
// }, "hello react jsx");
// 
console.log('element is', element);

export const ReactDOM = {
  render(vdom, container) {
    // 每次热更新都会有去render一下，会将新的dom节点挂载到页面上，所以需要先清空一下
    container.innerHTML = null;
    render(vdom, container);
  }
}



// const A = () => <div>I'm componentA</div>

// ReactDOM.render(
//   // element,
//   <A/>,
//   document.getElementById('root')
// )

// const A = (props) => {
//   console.log(props);
//   const { name } = props;
//   return (<div>i am component a with props, my owner name is {name}</div>)
// }
class A extends Component {
  constructor(props) {
    super(props)
    this.state = {
      count: 1
    }
  }

  click() {
    this.setState({
      count: ++this.state.count
    })
  }

  render() {
    return (
      <div>
        <button onClick={this.click.bind(this)}>Click Me!</button>
        <div>{this.props.name}:{this.state.count}</div>
      </div>
    )
  }
}

ReactDOM.render(
  <A name='luoqian' />,
  document.getElementById('root')
)

// <A/> babel编译 -> React.createElement(A, null)