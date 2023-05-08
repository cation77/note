/**
 * 寻找数组的中心索引
 * https://leetcode.cn/problems/find-the-middle-index-in-array/
 * 先获取总值，中心下标可以位于数组最左端或最右端
 * 因此 target 左侧部分总值需要先比较，再进行累加
 * @param {number[]} nums 
 * @returns {number}
 */

function findMiddleIndex(nums) {
  let total = 0;
  for (let i = 0; i < nums.length; i++) {
    total += nums[i];
  }
  let left = 0;
  for (let i = 0; i < nums.length; i++) {
    if (total === (2 * left + nums[i])) {
      return i;
    }
    left += nums[i]
  }
  return -1;
}

function findMiddleIndex(nums) {
  const total = nums.reduce((pre, cur) => pre + cur);
  let sum = 0;
  for (let i = 0; i < nums.length; i++) {
    if (total === (2 * sum + nums[i])) {
      return i;
    }
    sum += nums[i];
  }
  return -1
}