/**
 * 最大连续1的个数
 * 给定一个二进制数组 nums 计算其中最大连续 1 的个数。
 * @param {number[]} nums
 * @return {number}
 */
var findMaxConsecutiveOnes = function (nums) {
  let slow = -1
  let count = 0
  for (let fast = 0; fast < nums.length; fast++) {
    if (nums[fast] === 1) {
      const sum = fast - slow
      count = sum > count ? sum : count
    } else if (nums[fast] === 0) {
      slow = fast
    }
  }
  return count
};

/**
 * 贪婪算法
 * @param {number[]} nums
 * @return {number}
 */
var findMaxConsecutiveOnes = function (nums) {
  let max = 0;
  let count = 0
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] === 1) {
      count++
      max = count > max ? count : max
    } else if (nums[i] === 0) {
      count = 0
    }
  }
  return max
};
const nums = [1, 1, 0, 1, 1, 1]

console.log(findMaxConsecutiveOnes(nums))