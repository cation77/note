/**
 * 找到 K 个最接近的元素
 * 给定一个 排序好 的数组 arr ，两个整数 k 和 x ，从数组中找到最靠近 x（两数之差最小）的 k 个数。返回的结果必须要是按升序排好的。
 *
 * 示例 1：
 * 输入：arr = [1,2,3,4,5], k = 4, x = 3
 * 输出：[1,2,3,4]
 *
 * @param {*} arr
 * @param {*} k
 * @param {*} x
 * @returns
 */

function findClosestElements(arr, k, x) {
  let left = 0;
  // 找左边界的起始终止点，左边界一旦大于数组的长度减 k，则不满足凑齐题目要求的 k 个数
  let right = arr.length - k;
  // 搜索空间是：[left, right)
  while (left < right) {
    const mid = left + Math.floor((right - left) / 2);
    // mid + k 不会越界，因为 right = arr.length - k 且 搜索时不包含 right，所以 mid + k 值小于 arr.length
    if (x - arr[mid] > arr[mid + k] - x) {
      // 根据条件 |a - x| == |b - x| 且 a < b
      // 比较 arr[mid] 和 arr[mid+k] 的大小
      left = mid + 1;
    } else {
      right = mid;
    }
  }
  return arr.slice(left, left + k);
}
