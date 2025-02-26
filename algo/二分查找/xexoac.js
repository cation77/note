/*
 * 二分查找
 * @param {Array} nums 已排序的数组
 * @param {number} target 要查找的元素
 * @return {number} 元素在数组中的下标，如果找不到返回 -1
 */

function search(nums, target) {
  let left = 0;
  let right = nums.length - 1;
  while (left <= right) {
    const mid = left + Math.floor(right - left / 2);
    if (target === nums[mid]) {
      return mid;
    } else if (target < nums[mid]) {
      right = mid - 1;
    } else {
      left = mid + 1;
    }
  }
  return -1;
}
