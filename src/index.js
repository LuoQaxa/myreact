
import { humpToStandard } from './util';
import Component from './Component';
const React = {
  createElement,
  Component
}

/**
 * 将jsx转化为虚拟DOM
 * @param {*} tag 标签类型
 * @param {*} attribute 属性对象
 * @param {*} children 子节点
 */
// TODO: 如果有多个children
function createElement(tag, attribute, ...children) {  
  // tag有可能是一个函数，即组件
  return {
    attribute,
    children,
    key: attribute ? attribute.key || undefined : undefined,
    nodeName: tag
  }
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

/**
 * 将虚拟dom渲染到页面上
 * @param {*} vdom 虚拟dom
 * @param {*} container 挂载到的html节点
 * vdom.nodeName 如果是自定义组件则为一个函数: f componentName() {}
 */
function render(vdom, container) {
  // 如果是function const A = () => { <div>dsdsds</div> } 或者是class的形式
  // class A { render() {return ()}} , new A()
  // 两种的区别在于一个函数是继承了Component所以prototype上有render方法
  let component, returnVdom;
  if (typeof(vdom.nodeName) === 'function') {
    if (vdom.nodeName.prototype.render) {
      // 将属性传入，这里是将所有的属性都传入了类的constructor中
      // 
      component = new vdom.nodeName(vdom.attribute);
      returnVdom = component.render()
    } else {
      returnVdom = vdom.nodeName();
    }
    console.log('returnvdom is', returnVdom);
    render(returnVdom, container)
    return;
  }

  if (typeof(vdom) === 'string' || typeof(vdom) === 'number') {
    container.innerText = vdom;
    return 
  }
  const dom = document.createElement(vdom.nodeName)

  // 将属性添加到dom上
  for (let attr in vdom.attribute) {
    setAttribute(dom, attr, vdom.attribute[attr])
  }
  vdom.children.forEach(vdomChild => render(vdomChild, dom))
  container.appendChild(dom);
  // 将属性设置在这个dom节点上

}

/**
 * 给节点设置属性
 * @param {*} dom 操作元素
 * @param {*} attr 属性
 * @param {*} value 元素值
 */
function setAttribute(dom, attr, value) {
  if (attr === 'className') {
    attr = 'class'
  }
  if (attr.match(/on\w+/)) {      // 处理事件属性
    const eventName = attr.toLowerCase().slice(2);
    dom.addEventListener(eventName, value);
  } else if (attr === 'style') {
    let styleStr = ''
    let standardCss
    // {color: red, fontSize: 18px}
    // color:red; font-size:18px
    for (let klass in value) {
      standardCss = humpToStandard(klass)
      styleStr += `${standardCss}: ${value[klass]};`
    }
    dom.setAttribute(attr, styleStr);
  } else {
    dom.setAttribute(attr, value);
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
  // new A()的时候，会执行constructor，那为什么要传递props到constructor里面呢
  // super的作用到底是什么呢，props到底是从哪里来的呢
  constructor(props) {
    // 将这个A组件的props放到super当中执行
    // super(props)
    // super的作用是调用父组件的构造函数
    // 将属性挂载到实例上
    super(props)
    // this.state = {
    //   count: 1
    // }
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
        {/* {包裹的在babel编译时就会被执行} */}
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