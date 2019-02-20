# myreact
实现一个简易版本的react，理清react的主干内容和重要知识点

1. jsx
jsx是一种语法糖，js能够写在html中。本质上是利用babel，转换为React.createElement()方法的调用。
这也是为什么每一个jsx文件中，虽然没有用到`React`也需要引入。
实现：
```jsx
const element = (
  <div style={{ color: 'green', fontSize: '25px'}}>hello react jsx</div>
)

ReactDOM.render(
  element,
  document.getElementById('root')
)
```

1. 组件