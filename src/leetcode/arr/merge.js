/**
 * 合并区间
 * 策略: 由于集合没有顺序，无法作比较
 * 先排序、后比较
 * 比较判断 借用临时空间 temp 和 cur 判断是否需要合并集合
 * 当temp[1] > cur[0]时，则合并
 * @param {number[][]} intervals 
 * @returns {number[][]}
 */

var merge = function (intervals) {
  const len = intervals.length;
  if (len <= 1) return intervals;
  intervals.sort((a, b) => a[0] - b[0]) // 排序
  const list = [];
  for (let i = 0; i < len; i++) {
    const temp = list[list.length - 1]
    const cur = intervals[i];
    if (temp && temp[1] >= cur[0]) {
      // 判断是否就交集
      // 比较获取 min 和 max
      const min = Math.min(temp[0], cur[0])
      const max = Math.max(temp[1], cur[1])
      list[list.length - 1] = [min, max]
    } else {
      // 没有则push
      list.push(cur)
    }
  }
  return list;
}

var merge = function (intervals) {
  if (intervals.length <= 1) return intervals; // 排序
  intervals.sort((a, b) => a[0] - b[0])
  const list = [];
  for (let i = 0; i < intervals.length; i++) {
    const temp = list[list.length - 1];
    const cur = intervals[i];
    if (temp && temp[1] >= cur[0]) {
      // 判断是否有包含
      const left = Math.min(temp[0], cur[0])
      const right = Math.max(temp[1], cur[1])
      list[list.length - 1] = [left, right]
    } else {
      list.push(cur)
    }
  }
  return list;
}