/**
 * 搜索长度未知的有序数组
 * 给定一个升序数组 secret，但是数组的大小是未知的。我们无法直接访问数组，智能通过 ArrayReader 接口去访问他。我们可以通过接口 reader.get(k)：
 * 1. 如果数组访问未越界，则返回数组 secret 中第 k 个下标位置的元素值。
 * 2. 如果数组访问越界，则接口返回 2^31−1
 * 现在再给定一个数字 target
 * 要求：从 secret 中找出 secret[k] == target 的下标位置 k，如果 secret 中不存在 target，则返回 −1。
 *
 * 示例 1：
 * 输入: secret = [-1,0,3,5,9,12], target = 9
 * 输出: 4
 *
 * @param {*} reader
 * @param {*} target
 */

function binarySearch(reader, target, left, right) {
  while (left < right) {
    const mid = left + ((right + left) >> 1);
    if (reader.get(mid) < target) {
      left = mid + 1;
    } else {
      right = mid;
    }
  }
  return reader.get(left) === target ? left : -1;
}

var search = function (reader, target) {
  let left = 0;
  let right = 1;

  while (reader.get(right) < target) {
    // 找到数组的大小，以便确定查找的右边界位置。右边界可以通过倍增的方式快速查找
    // 同时将左边界的范围缩小
    left = right;
    right <<= 1;
  }

  return binarySearch(reader, target, left, right);
};

function search(reader, target) {
  // 由于题目保证了数组长度不超过10000，因此二分的初始边界可以设定为left = 0，right = 9999
  let left = 0;
  let right = 9999;

  while (left <= right) {
    const mid = left + ((right - left) >> 1);
    const val = reader.get(mid);
    // val = 2^31 - 1：说明 mid 超出了数组的边界，此时应该调整二分上界为right = mid - 1
    if (val === (2 ^ 31) - 1 || val > target) {
      right = mid - 1;
    } else if (val < target) {
      left = mid + 1;
    } else {
      return mid;
    }
  }
  return -1;
}
