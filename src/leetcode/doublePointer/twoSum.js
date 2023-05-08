// 思路
// 注意这里数组是从小到大排序的，对于有序数组，我们把指针分别指向首尾
// 判断3种情况 
// 1. 首尾下标元素相加值等于目标值，返回结果集
// 2. 首尾下标元素相加值小于目标值，首指针后移变大
// 3. 首尾下标元素相加值大于目标值，尾指针前移变小

/**
 * 两数之和 II - 输入有序数组
 * 给你一个下标从 1 开始的整数数组 numbers 该数组已按非递减顺序排列, 从数组中找出满足相加之和等于目标数 target 的两个数
 * @param {number[]} numbers
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function (numbers, target) {
  let start = 0;
  let end = numbers.length - 1
  while (start < end) {
    const sum = numbers[start] + numbers[end]
    if (target === sum) {
      return [start + 1, end + 1]
    } else if (target > sum) {
      start++
    } else if (target < sum) {
      end--
    }
  }
}

var twoSum = function (numbers, target) {
  const obj = {}
  for (let i = 0; i < numbers.length; i++) {
    const remainder = target - numbers[i]
    if (obj[remainder]) {
      return [obj[remainder], i + 1]
    }
    obj[numbers[i]] = i + 1
  }
};

const numbers = [2, 7, 11, 15]
const target = 9

console.log(twoSum(numbers, target)) // [1, 2]