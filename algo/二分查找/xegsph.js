/**
 * 分割数组的最大值
 * 给定一个非负整数数组 nums 和一个整数 k ，你需要将这个数组分成 k 个非空的连续子数组，使得这 k 个子数组各自和的最大值 最小。
 * 链接：https://leetcode.cn/leetbook/read/binary-search/xegsph/
 * 题目：https://leetcode.cn/problems/split-array-largest-sum/description/
 *
 * 示例 1：
 * 输入：nums = [7,2,5,10,8], k = 2
 * 输出：18
 *
 * 示例 2：
 * 输入：nums = [1,2,3,4,5], k = 2
 * 输出：9
 *
 * 示例 3：
 * 输入：nums = [1,4,4], k = 3
 * 输出：4
 *
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var splitArray = function (nums, k) {
  let left = 0;
  let right = 0;
  // 二分的上界为数组 nums 中所有元素的和，下界为数组 nums 中所有元素的最大值
  for (let i = 0; i < nums.length; i++) {
    right += nums[i];
    if (left < nums[i]) {
      left = nums[i];
    }
  }

  while (left < right) {
    const mid = left + ((right - left) >> 1);
    if (check(nums, mid, k)) {
      right = mid;
    } else {
      // 如果分割数太多，说明「子数组各自的和的最大值」太小，此时需要将「子数组各自的和的最大值」调大
      left = mid + 1;
    }
  }
  return left;
};

/**
 *
 * @param {*} nums 原始数组
 * @param {*} x 子数组各自的和的最大值
 * @param {*} k 分组数
 * @returns
 */
function check(nums, x, k) {
  // 至少是一个分割
  let count = 1;
  // 当前区间的和
  let sum = 0;
  for (let i = 0; i < nums.length; i++) {
    // 尝试加上当前遍历的这个数，如果加上去超过了「子数组各自的和的最大值」，就不加这个数，另起炉灶
    if (sum + nums[i] > x) {
      count++;
      sum = nums[i];
    } else {
      sum += nums[i];
    }
  }
  return count <= k;
}
