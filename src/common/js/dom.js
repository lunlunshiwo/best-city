// 获取或者给dom属性赋值
export function handleDomData (el, name, val) {
  if (val) {
    return el.setAttribute(name, val)
  } else {
    return el.getAttribute(name)
  }
}
// 获取每一个字母在数组中对应的index
export function getIndex (arr, query) {
  let key
  arr.map((val, index) => {
    if (val === query) {
      key = index
      return false
    }
  })
  return key
}
// 计算链接每一部分的高度
export function getDistance (arr) {
  let titleHeight = 30
  let itemHeight = 35
  let distanceArr = []
  arr.map((item) => {
    distanceArr.push(titleHeight + itemHeight * item[1].length)
  })
  return distanceArr
}
