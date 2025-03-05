/**
 * 两个数组的交集
 * 给定两个数组 nums1 和 nums2 ，返回 它们的 交集 。输出结果中的每个元素一定是 唯一 的。我们可以 不考虑输出结果的顺序 。
 *
 * 示例 1：
 * 输入：nums1 = [1,2,2,1], nums2 = [2,2]
 * 输出：[2]
 *
 * @param {*} nums1
 * @param {*} nums2
 * @returns
 */

/**
 * 方法一
 * 哈希表 + 遍历
 */
var intersection = function (nums1, nums2) {
  const map = {};
  const res = [];
  for (let i = 0; i < nums1.length; i++) {
    const val = nums1[i];
    map[val] = 1;
  }

  for (let i = 0; i < nums2.length; i++) {
    const val = nums2[i];
    if (map[val] === 1) {
      res.push(val);
      map[val] += 1;
    }
  }

  return res;
};

var intersection = function (nums1, nums2) {
  const map = {};
  const res = [];
  for (let i of nums1) {
    map[i] = 1;
  }
  for (let i of nums2) {
    if (map[i] === 1) {
      res.push(i);
      map[i] += 1;
    }
  }
  return res;
};

/**
 * 方法二
 * 遍历长度小的数组，用二分在长度大的数组中查找
 */
function intersection(nums1, nums2) {
  if (nums1.length > nums2.length) {
    [nums1, nums2] = [nums2, nums1];
  }
  // 要确保排序的是长度较大的数组
  nums2.sort((a, b) => a - b);
  const set = new Set();
  for (let i of nums1) {
    let left = 0;
    let right = nums2.length - 1;
    while (left <= right) {
      const mid = left + ((right - left) >> 1);
      if (nums2[mid] === i) {
        set.add(i);
        break;
      } else if (nums2[mid] < i) {
        left = mid + 1;
      } else {
        right = mid - 1;
      }
    }
  }

  return [...set];
}

/**
 * 数组排序后双指针遍历
 */
