/**
 * 寻找旋转排序数组中的最小值
 * @param {*} nums
 * @returns
 */

function findMin(nums) {
  const len = nums.length;
  let left = 0;
  let right = len - 1;
  let res = -1;
  while (left <= right) {
    const mid = left + ((right - left) >> 1);
    // 跟最后一个元素比较，当小于 nums[len - 1]，则搜索空间在 [left, mid - 1]
    if (nums[mid] <= nums[len - 1]) {
      res = nums[mid];
      right = mid - 1;
    } else {
      left = mid + 1;
    }
  }
  return res;
}
