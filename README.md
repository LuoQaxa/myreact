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
const A = (props) => {
  console.log(props);
  const { name } = props;
  return (<div>i am component a with props, my owner name is {props}</div>)
}

ReactDOM.render(
  <A name='luoqian'/>,
  document.getElementById('root')
)
```

