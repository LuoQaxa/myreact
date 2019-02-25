/**
 * 将jsx转化为虚拟DOM
 * @param {*} tag 标签类型
 * @param {*} attribute 属性对象
 * @param {*} children 子节点
 */
export default function createElement(tag, attribute, ...children) {
  // tag有可能是一个函数，即组件
  return {
    attribute,
    children,
    key: attribute ? attribute.key || undefined : undefined,
    nodeName: tag
  }
}