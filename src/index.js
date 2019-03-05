
import { humpToStandard } from './util';
import Component from './Component';
import createElement from './createElement';
import { render } from './render';

const React = {
  createElement,
  Component
}

// const element = (
//   <div style={{ color: 'green', fontSize: '25px' }}>
//     <div> 
//        hello react jsx
//     </div>
//   </div>
// )

// 在经过babel转化后的js代码为
// var element = React.createElement("div", {
//   style: {
//     color: 'green',
//     fontSize: '25px'
//   }
// }, "hello react jsx");
// 
// console.log('element is', element);

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
    super(props);
    
  }
  
  componentWillReceiveProps(props) {
    console.log('componentWillReceiveProps')
  }

  render() { 
    return (
      <div>{this.props.count}</div>
    )
  }
}

class B extends Component {
  constructor(props) {
    super(props)
    this.state = {
      count: 1
    }
    console.log('b this.props is ', this.props);
    
  }

  componentWillMount() {
    console.log('componentWillMount')
  }

  componentDidMount() {
    console.log('componentDidMount')
  }

  shouldComponentUpdate(nextProps, nextState) {
    console.log('shouldComponentUpdate', nextProps, nextState)
    return true
  }

  componentWillUpdate() {
    console.log('componentWillUpdate')
  }

  componentDidUpdate() {
    console.log('componentDidUpdate')
  }

  click() {
    console.log('click btn');
    
    debugger
    this.setState({
      count: ++this.state.count
    })
  }

  render() {
    console.log('render')
    return (
      <div>
        <button onClick={this.click.bind(this)}>Click Me!</button>
        <A count={this.state.count} />
      </div>
    )
  }
}

ReactDOM.render(
  <B />,
  document.getElementById('root')
)

// <A/> babel编译 -> React.createElement(A, null)