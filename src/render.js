/**
 * 将虚拟dom渲染到页面上
 * @param {*} vdom 虚拟dom
 * @param {*} container 挂载到的html节点
 * vdom.nodeName 如果是自定义组件则为一个函数: f componentName() {}
 */
export function render(vdom, container) {
  // 如果是function const A = () => { <div>dsdsds</div> } 或者是class的形式
  // class A { render() {return ()}} , new A()
  // 两种的区别在于一个函数是继承了Component所以prototype上有render方法
  let component, returnVdom;
  if (typeof (vdom.nodeName) === 'function') {
    if (vdom.nodeName.prototype.render) {
      // 将属性传入，这里是将所有的属性都传入了类的constructor中
      component = new vdom.nodeName(vdom.attribute);
      returnVdom = component.render()
    } else {
      returnVdom = vdom.nodeName();
    }
    render(returnVdom, container)
    return;
  }

  if (typeof (vdom) === 'string' || typeof (vdom) === 'number') {
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
  if (attr.match(/on\w+/)) { // 处理事件属性
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