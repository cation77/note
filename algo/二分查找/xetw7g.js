/**
 * 寻找旋转排序数组中的最小值 II
 * 这道题与 寻找旋转排序数组中的最小值 类似，但 nums 可能包含重复元素
 *
 * 示例 1：
 * 输入：nums = [1,3,5]
 * 输出：1
 *
 * 示例 2：
 * 输入：nums = [2,2,2,0,1]
 * 输出：0
 *
 * @param {*} nums
 * @returns
 */

function findMin(nums) {
  let left = 0;
  let right = nums.length - 1;
  while (left < right) {
    const mid = left + ((right - left) >> 1);
    if (nums[mid] === nums[right]) {
      // nums[mid] == nums[right],无法确定中间元素的大小，只好一点点的缩小右侧边界
      right--;
    } else if (nums[mid] < nums[right]) {
      right = mid;
    } else {
      left = mid + 1;
    }
  }
  return nums[left];
}
