# myreact
实现一个简易版本的react，理清react的主干内容和重要知识点

## 一 jsx
jsx是一种语法糖，js能够写在html中。本质上是利用babel，转换为React.createElement()方法的调用。
这也是为什么每一个jsx文件中，虽然没有用到`React`也需要引入。

#### 实现：
```jsx
const element = (
  <div style={{ color: 'green', fontSize: '25px'}}>hello react jsx</div>
)

ReactDOM.render(
  element,
  document.getElementById('root')
)
```
#### 难点：
  1. `jsx`语法糖原理：babel转换 -> React.createElement -> virtualDOM。需要自己实现`React.createElement`方法。
  2. `ReactDOM.render`: 由于`html`结构是一个嵌套结构，所以在渲染`vdom`的时候需要用到递归。在`render`方法里创建`dom`元素和为`dom`添加对应的属性，并将`dom` `append`到对应的父节点里
  3. 递归：

## 二 组件
组件有两种方式：纯函数组件和用class定义的组件
#### 实现：
```jsx
class A extends Component {

  render() {
    <div style={{ color: 'green', fontSize: '25px'}}>hello component</div>
  }
}

const B = () => {
  return (
    <div style={{ color: 'green', fontSize: '25px'}}>hello react jsx</div>
  )
}

ReactDOM.render(
  <A/>,
  document.getElementById('root')
)
```
#### 难点：
  1. 组件形式`<A/>`经过babel的编译后 ->  `React.createElement(A, null)` ,这样意味着`vdom`的`nodeName`为一个函数，在`render`的时候需要判断`vdom.nodeName`如果为函数做相应的处理。


## 三 影响组件的两大属性：props 和 state

#### 实现
```jsx
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
  <A name='luoqian'/>,
  document.getElementById('root')
)
```

#### 难点：
  1. 所有组件都继承`Component`构造函数，这个函数的原型上添加setState方法，当调用时重新渲染更新后的`vdom`
  2. 组件的props是如何传入组件的：在`render`的时候将`vdom.attribute`传入`new Vdom.nodeName(vdom.attribute)`，在组件的`constructor`中将`props`传入，调用`super(props)`调用`Component`构造函数，将`props`添加到实例属性上。
  3. `ReactDOM.render`在每次热更新的时候需要清空当前渲染的dom。


## 四 整理项目结构
将方法拆分到单独的文件中

#### 难点：
  1. `Component.prototype.setState`的方法中传入的是新的state，将新的state和和旧的state组合后，调用`component`的`render`方法获得该组件的`vdom`。再调用`ReactDOM.render`方法重新渲染页面。


## 五 生命周期

#### 实现：
```js
class A extends Component {
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
```

#### 难点
首先你要十分清楚react的生命周期,执行生命周期函数，其实就是拿到定义的函数执行。那么如何拿到这些函数？第一个问题就是`component`实例如何拿到
`createComponent`函数用于获取这个实例。

## 六 diff算法





