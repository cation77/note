/**
 * 两个数组的交集 II
 * 给你两个整数数组 nums1 和 nums2 ，请你以数组形式返回两数组的交集。返回结果中每个元素出现的次数，应与元素在两个数组中都出现的次数一致（如果出现次数不一致，则考虑取较小值）。可以不考虑输出结果的顺序。
 *
 * 示例 1：
 * 输入：nums1 = [1,2,2,1], nums2 = [2,2]
 * 输出：[2,2]
 *
 * @param {*} nums1
 * @param {*} nums2
 * @returns
 */

// 进阶：
// 如果给定的数组已经排好序呢？你将如何优化你的算法？
// 如果 nums1 的大小比 nums2 小，哪种方法更优？
// 如果 nums2 的元素存储在磁盘上，内存是有限的，并且你不能一次加载所有的元素到内存中，你该怎么办？

/**
 * 数组排序后双指针遍历
 * 如果已经排好序, 用双指针，时间复杂度O(n + m), 空间 O(1)
 */
var intersect = function (nums1, nums2) {
  nums1.sort((a, b) => a - b);
  nums2.sort((a, b) => a - b);

  let p = 0;
  let q = 0;
  let res = [];

  while (p < nums1.length && q < nums2.length) {
    if (nums1[p] < nums2[q]) {
      p++;
    } else if (nums2[q] < nums1[p]) {
      q++;
    } else {
      res.push(nums1[p]);
      p++;
      q++;
    }
  }
  return res;
};

/**
 * 哈希表
 * 时间复杂度 O(n + m), 空间复杂度 O(min(n, m))
 */
function intersect(nums1, nums2) {
  if (nums1.length > nums2.length) {
    [nums1, nums2] = [nums2, nums1];
  }

  const hash = {};
  const res = [];
  for (let i of nums1) {
    if (hash[i]) {
      hash[i] += 1;
    } else {
      hash[i] = 1;
    }
  }
  for (let j of nums2) {
    if (hash[j] > 0) {
      res.push(j);
      hash[j] -= 1;
    }
  }

  return res;
}
