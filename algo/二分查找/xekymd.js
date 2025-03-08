/**
 * 找出第 k 小的距离对
 * 数对 (a,b) 由整数 a 和 b 组成，其数对距离定义为 a 和 b 的绝对差值。
 * 给你一个整数数组 nums 和一个整数 k ，数对由 nums[i] 和 nums[j] 组成且满足 0 <= i < j < nums.length 。返回 所有数对距离中 第 k 小的数对距离。
 * 链接：https://leetcode.cn/leetbook/read/binary-search/xekymd/
 *
 * 示例 1：
 * 输入：nums = [1,3,1], k = 1
 * 输出：0
 *
 * 示例 2：
 * 输入：nums = [1,1,1], k = 2
 * 输出：0
 *
 * 示例 3：
 * 输入：nums = [1,6,1], k = 3
 * 输出：5
 *
 * 「第 k 小的距离对」不是「第 k 小的不同距离对」
 * 相同的距离要参与排序，相同的距离不能合并成一项
 *
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
function check(nums, dis) {
  let left = 0;
  let count = 0;
  // 使用「滑动窗口」在排好序的数组上滑动
  // 数出所有的小于等于 dis 的对数的个数
  for (let right = 1; right < nums.length; right++) {
    while (nums[right] - nums[left] > dis) {
      left++;
    }
    count += right - left;
  }
  return count;
}

var smallestDistancePair = function (nums, k) {
  //先对数组排序,，为了更方便地数出个数
  nums.sort((a, b) => a - b);

  const len = nums.length;
  let left = 0;
  let right = nums[len - 1] - nums[0];

  while (left < right) {
    const mid = left + ((right - left) >> 1);
    if (check(nums, mid) < k) {
      // 如果小于等于 mid 的个数严格小于 k 个，说明 mid 太小了
      left = mid + 1;
    } else {
      right = mid;
    }
  }
  return left;
};
