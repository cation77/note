/*
 * 搜索旋转排序数组
 * 整数数组 nums 按升序排列，数组中的值互不相同 。
 * nums 在预先未知的某个下标 k（0 <= k < nums.length）上进行了旋转
 * 例如 [0,1,2,4,5,6,7] 在下标 3 处经旋转后可能变为 [4,5,6,7,0,1,2] 。
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */

/*
 * 搜索旋转排序数组
 * ***
 * 判断mid所在元素是左递增还是右递增
 * 根据 nums[mid] 和 nums[right] 比较，判断：
 * 1. 如果 nums[mid] > nums[right]，说明左递增，此时分两种情况：
 * - 若 target 在左递增区间，则排除 mid 右边的所有值
 * - 若不在，则排除 mid 左边的所有值
 * 2. 如果nums[mid] < nums[right]，说明右递增，此时分两种情况：
 * - 若 target 在右递增区间，则排除 mid 左侧的所有值
 * - 若不在，则排除 mid 右边的所有值
 *
 * ***
 * 法二：还可以先找到旋转点，再分情况从[left,旋转点)或[旋转点,right]进行普通二分查找
 */

function search(nums, target) {
  let left = 0;
  let right = nums.length - 1;
  while (left <= right) {
    const mid = left + Math.floor((right - left) / 2);
    if (nums[mid] === target) {
      return mid;
    } else if (nums[mid] > nums[right]) {
      // 左递增
      if (target < nums[mid] && target >= nums[left]) {
        // 若 target 在左递增区间，则排除 mid 右边的所有值
        right = mid - 1;
      } else {
        // 若不在，则排除 mid 左边的所有值
        left = mid + 1;
      }
    } else {
      // 右递增
      if (target > nums[mid] && target <= nums[right]) {
        // 若 target 在右递增区间，则排除 mid 左侧的所有值
        left = mid + 1;
      } else {
        // 若不在，则排除 mid 右边的所有值
        right = mid - 1;
      }
    }
  }
  return -1;
}
