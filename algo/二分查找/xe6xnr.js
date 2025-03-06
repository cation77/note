/**
 * 寻找重复数
 * 给定一个包含 n + 1 个整数的数组 nums ，其数字都在 [1, n] 范围内（包括 1 和 n），可知至少存在一个重复的整数。
 * 假设 nums 只有 一个重复的整数 ，返回 这个重复的数 。
 * 设计的解决方案必须 不修改 数组 nums 且只用常量级 O(1) 的额外空间。
 *
 * 示例 1：
 * 输入：nums = [1,3,4,2,2]
 * 输出：2
 *
 * 示例 2：
 * 输入：nums = [3,1,3,4,2]
 * 输出：3
 *
 * @param {number[]} nums
 * @return {number}
 */

/**
 * 方法一：二分查找
 * 设定一个中间值 mid，统计数组中小于等于 mid 的个数 count
 * 如果 count 超过了 mid，说明重复的数在 [left, mid] 范围内，否则重复的数在 [mid, right] 范围
 *
 * 时间复杂度：O(nlogn)
 * n 为 nums 数组的长度，二分查找最多需要二分 O(logn) 次，每次判断的时候需要 O(n) 遍历 nums 数组
 * 空间复杂度：O(1)
 */
var findDuplicate = function (nums) {
  const len = nums.length;
  let left = 1;
  let right = len - 1;

  while (left < right) {
    const mid = left + ((right - left) >> 1);
    let count = 0;
    for (let i = 0; i < len; i++) {
      if (nums[i] <= mid) {
        count++;
      }
    }
    if (count > mid) {
      right = mid;
    } else {
      left = mid + 1;
    }
  }
  return left;
};

/**
 * 方法三：快慢指针
 * 慢指针每次走一步，快指针每次走两步
 *
 * 时间复杂度：O(n)。「Floyd 判圈算法」时间复杂度为线性的时间复杂度。
 * 空间复杂度：O(1)。我们只需要常数空间存放若干变量。
 *
 * @param {*} nums
 * @returns
 */
function findDuplicate(nums) {
  let slow = 0;
  let fast = 0;
  do {
    slow = nums[slow];
    fast = nums[nums[fast]];
  } while (slow !== fast);

  slow = 0;

  while (slow !== fast) {
    slow = nums[slow];
    fast = nums[fast];
  }
  return slow;
}
