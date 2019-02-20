/**
 * 驼峰转为标准样式
 * @param {*} klass 驼峰
 * fontSize > font-size
 */
export const humpToStandard = function(klass) {
  // 怎么用js转化这个字符串
  return klass.replace(/[A-Z]/, (match) => '-' + match.toLowerCase())
}