/**
 * 寻找旋转排序数组中的最小值
 * 给你一个元素值 互不相同 的数组 nums ，它原来是一个升序排列的数组，并按上述情形进行了多次旋转。请你找出并返回数组中的 最小元素 。
 * 必须设计一个时间复杂度为 O(log n) 的算法解决此问题。
 * 示例 1：
 * 输入：nums = [3,4,5,1,2]
 * 输出：1
 *
 * @param {*} nums
 * @returns
 */

function findMin(nums) {
  let left = 0;
  let right = nums.length - 1;
  while (left < right) {
    const mid = left + Math.floor((right - left) / 2);
    if (nums[mid] <= nums[right]) {
      right = mid;
    } else {
      left = mid + 1;
    }
  }
  return nums[left];
}

/**
 * 二分法模板一
 * 排序数组旋转后，可能还是原数组，也可能分成2个子升序数组
 * 通过比较 nums[mid] 和 nums[len - 1] 最后一个元素
 *
 */

function findMin1(nums) {
  const len = nums.length;
  let left = 0;
  let right = len - 1;
  let res = -1;
  while (left <= right) {
    const mid = left + Math.floor((right - left) / 2);
    if (nums[mid] <= nums[len - 1]) {
      res = mid;
      right = mid - 1;
    } else {
      left = mid + 1;
    }
  }
  return nums[res];
}
