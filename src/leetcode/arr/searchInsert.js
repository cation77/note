/**
 * 搜索插入位置
 * 要求使用时间复杂度为 O(log n) 的算法
 * 提示了二分法
 * 注意边界问题 right = nums.length - 1，这样 nums[right]有值
 * @param {number[]} nums 
 * @param {number} target 
 * @returns {number}
 */

var searchInsert = function (nums, target) {
  let left = 0;
  let right = nums.length - 1; // 需要减一，可触达有值
  while (left <= right) {
    const mid = Math.floor((left + right) / 2)
    if (target === nums[mid]) {
      return mid
    } else if (target > nums[mid]) {
      left = mid + 1;
    } else if (target < nums[mid]) {
      right = mid - 1;
    }
  }
  return left;
};

var searchInsert = function (nums, target) {
  let left = 0;
  let right = nums.length - 1;
  while (left <= right) {
    let mid = Math.floor((left + right) / 2)
    console.log(left, right, mid)
    if (nums[mid] === target) {
      return mid
    } else if (nums[mid] > target) {
      right = mid - 1;
    } else if (nums[mid] < target) {
      left = mid + 1;
    }
  }
  return left;
};