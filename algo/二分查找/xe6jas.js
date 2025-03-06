/**
 * 寻找两个正序数组的中位数
 * 给定两个大小分别为 m 和 n 的正序（从小到大）数组 nums1 和 nums2。请你找出并返回这两个正序数组的 中位数 。
 * 算法的时间复杂度应该为 O(log (m+n))
 *
 * 示例 1：
 * 输入：nums1 = [1,3], nums2 = [2]
 * 输出：2.00000
 *
 * 示例 2：
 * 输入：nums1 = [1,2], nums2 = [3,4]
 * 输出：2.50000
 *
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */

/**
 * 简单粗暴，先将两个数组合并，然后根据奇数，还是偶数，返回中位数
 * 时间复杂度：遍历全部数组 (m+n)
 * 空间复杂度：开辟了一个数组，保存合并后的两个数组 O(m+n)
 */
var findMedianSortedArrays = function (nums1, nums2) {
  let p = 0;
  let q = 0;
  let res = [];

  while (p < nums1.length && q < nums2.length) {
    if (nums1[p] < nums2[q]) {
      res.push(nums1[p]);
      p++;
    } else if (nums1[p] > nums2[q]) {
      res.push(nums2[q]);
      q++;
    } else if (nums1[p] === nums2[q]) {
      res.push(nums1[p], nums2[q]);
      p++;
      q++;
    }
  }
  while (p < nums1.length) {
    res.push(nums1[p]);
    p++;
  }
  while (q < nums2.length) {
    res.push(nums2[q]);
    q++;
  }
  const mid = Math.floor(res.length / 2);
  return res.length % 2 > 0 ? res[mid] : (res[mid - 1] + res[mid]) / 2;
};
