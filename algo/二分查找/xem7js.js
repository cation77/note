/*
 * 寻找峰值
 * 峰值元素是指其值严格大于左右相邻值的元素。
 * 给你一个整数数组 nums，找到峰值元素并返回其索引。数组可能包含多个峰值，在这种情况下，返回任何一个峰值所在位置即可。
 *
 * 示例 1：
 * 输入：nums = [1,2,3,1]
 * 输出：2
 * 示例 2：
 * 输入：nums = [1,2,1,3,5,6,4]
 * 输出：1 或 5
 *
 * @param {Array<number>} nums 数组
 * @returns {number} 峰值元素的下标
 */

/**
 * 解题
 * 思路：上坡必有顶
 * 如果 nums[mid] < nums[mid + 1]，则峰值元素在 mid 右侧，此时 left = mid + 1
 * 反之，nums[mid] 有可能是峰值元素，或峰值元素在 mid 左侧，此时 right = mid
 * 跳出循环时，left = right
 */

function findPeakElement(nums) {
  let left = 0;
  let right = nums.length;
  while (left < right) {
    const mid = left + Math.floor((right - left) / 2);
    // 上坡必有顶
    if (nums[mid] < nums[mid + 1]) {
      left = mid + 1;
    } else {
      right = mid;
    }
  }
  return left;
}
