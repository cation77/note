/*
 * 第一个错误的版本
 *
 * 假设你有 n 个版本 [1, 2, ..., n]，你想找出导致之后所有版本出错的第一个错误的版本。
 * 可以通过调用 bool isBadVersion(version) 接口来判断版本号 version 是否在单元测试中出错
 * 实现一个函数来查找第一个错误的版本
 *
 * 示例 1:
 * 输入: n = 5, bad = 4
 * 输出: 4
 * 解释: 4 是第一个错误的版本。
 */

function solution(isBadVersion) {
  return function (n) {
    let left = 1;
    let right = n;
    while (left < right) {
      const mid = left + Math.floor((right - left) / 2);
      if (isBadVersion(mid)) {
        right = mid;
      } else {
        left = mid + 1;
      }
    }
    return left;
  };
}
