const titleHeight = 30;
const itemHeight = 35;

// 获取或者给dom属性赋值
export const handleDomData = (el, name, val) => val ? el.setAttribute(name, val) : el.getAttribute(name);

// 获取每一个字母在数组中对应的index
export const getIndex = (arr, query) => arr.findIndex((val) => val === query);

// 计算链接每一部分的高度
export function getDistance(arr) {
  const distanceArr = [];
  arr.map((item) => {
    distanceArr.push(titleHeight + itemHeight * item[1].length);
  });
  return distanceArr;
}
