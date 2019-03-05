/**
 * 将虚拟dom渲染到页面上
 * @param {*} vdom 虚拟dom
 * @param {*} container 挂载到的html节点
 * vdom.nodeName 如果是自定义组件则为一个函数: f componentName() {}
 */
function render(vdom, container) {
  const dom = vdomToDom(vdom);
  container.appendChild(dom);
}

// () => {}
// class A 
function createComponent(vdom) {
  let component = {}
  if (vdom.nodeName.prototype.render) {
    component = new vdom.nodeName(vdom.attributes);
  } else {
    // 无状态的组件也给它添加一个render方法，那为什么需要这个方法呢？
    // 便于统一处理组件获取vdom
    component.render = function() {
      return vdom.nodeName(vdom.attributes)
    }
  }
  return component;
}


function vdomToDom(vdom) {
  if (typeof (vdom.nodeName) === 'function') {
    const component = createComponent(vdom)
    setProps(component)
    renderComponent(component)
    return component.base
  }
  if (typeof (vdom) === 'string' || typeof (vdom) === 'number') {
    const textNode = document.createTextNode(vdom)
    return textNode 
  }
  // 剩下的就是标签包裹的jsx了
  const dom = document.createElement(vdom.nodeName);
  for (const attr in vdom.attributes) {
    setAttribute(dom, attr, vdom.attributes[attr])
  }


  vdom.children.forEach(vdomChild => render(vdomChild, dom))
  return dom
}

/**
 * 
 * 更改属性，添加上生命周期函数 
 */
function setProps(component) {
  if (component && component.componentWillMount) {
    component.componentWillMount()
  } else if (component.base && component.componentWillReceiveProps) {
    component.componentWillReceiveProps(component.props)
  }
}

/**
 * 自定义组件的渲染逻辑
 * @param {*} component 
 */
function renderComponent(component) {
  if (component.base && component.shouldComponentUpdate) {
    // 运行scu
    const bool = component.shouldComponentUpdate(component.props, component.state)
    // 不返回的时候，默认为重新渲染
    if (!bool && bool !== undefined) {
      return false      
    }
  }
  if (component.base && component.componentWillUpdate) {
    component.componentWillUpdate();
  }

  const rendered = component.render();
  const base = vdomToDom(rendered);

  // componentDidMount只要是base没有值就可以了
  if (component.base && component.componentDidUpdate) {
    component.componentDidUpdate()
  } else if (component && component.componentDidMount) {
    component.componentDidMount()
  }

  if (component.base && component.base.parentNode) { // setState
    component.base.parentNode.replaceChild(base, component.base)
  }

  // 如果有base属性说明已经渲染过
  component.base = base;
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

export { render, vdomToDom, renderComponent }