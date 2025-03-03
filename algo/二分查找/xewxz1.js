/**
 * 寻找峰值
 * 模板二 解法
 * @param {*} nums
 * @returns
 */

function findPeakElement(nums) {
  let left = 0;
  let right = nums.length - 1;
  while (left < right) {
    const mid = left + Math.floor((right - left) / 2);
    if (nums[mid] <= nums[mid + 1]) {
      left = mid + 1;
    } else {
      right = mid;
    }
  }
  return left;
}

/**
 * 模板三 解法
 * @param {*} nums
 * @returns
 */
function findPeakElement(nums) {
  let left = 0;
  let right = nums.length - 1;

  while (left + 1 < right) {
    const mid = left + Math.floor((right - left) / 2);
    if (nums[mid - 1] < nums[mid]) {
      left = mid;
    } else {
      right = mid;
    }
  }
  return nums[right] > nums[left] ? right : left;
}
