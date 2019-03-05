/**
 * 将jsx转化为虚拟DOM
 * @param {*} tag 标签类型
 * @param {*} attributes 属性对象
 * @param {*} children 子节点
 */
export default function createElement(tag, attributes, ...children) {
  // tag有可能是一个函数，即组件
  // debugger
  return {
    attributes,
    children,
    key: attributes ? attributes.key || undefined : undefined,
    nodeName: tag
  }
}