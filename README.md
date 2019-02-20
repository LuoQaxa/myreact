# myreact
实现一个简易版本的react，理清react的主干内容和重要知识点

## jsx
jsx是一种语法糖，js能够写在html中。本质上是利用babel，转换为React.createElement()方法的调用。
这也是为什么每一个jsx文件中，虽然没有用到`React`也需要引入。

### 实现：
```jsx
const element = (
  <div style={{ color: 'green', fontSize: '25px'}}>hello react jsx</div>
)

ReactDOM.render(
  element,
  document.getElementById('root')
)
```
### 难点：
  1. `jsx`语法糖原理：babel转换 -> React.createElement -> virtualDOM。需要自己实现`React.createElement`方法。
  2. `ReactDOM.render`: 由于`html`结构是一个嵌套结构，所以在渲染`vdom`的时候需要用到递归。在`render`方法里创建`dom`元素和为`dom`添加对应的属性，并将`dom` `append`到对应的父节点里
  3. 递归：

## 组件
组件有两种方式：纯函数组件和用class定义的组件
### 实现：
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