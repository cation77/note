/**
 * 有效的完全平方数
 * 给你一个正整数 num 。如果 num 是一个完全平方数，则返回 true ，否则返回 false 。
 *
 * 示例 1：
 * 输入：num = 16
 * 输出：true
 *
 * 示例 2：
 * 输入：num = 14
 * 输出：false
 *
 * @param {*} num
 * @returns
 */

function isPerfectSquare(num) {
  let left = 1;
  let right = num;
  while (left <= right) {
    // const mid = left + Math.floor((right - left) / 2);
    const mid = left + ((right - left) >> 1);
    // 使用num%mid保证整除,在通过mid==num/mid防止mid*mid数据溢出
    if (num % mid === 0 && mid === num / mid) {
      return true;
    } else if (mid < num / mid) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }
  return false;
}
