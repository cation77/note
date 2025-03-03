/**
 * Pow(x, n)
 * 实现 pow(x, n) ，即计算 x 的整数 n 次幂函数（即，xn ）。
 *
 * 示例 1：
 * 输入：x = 2.00000, n = 10
 * 输出：1024.00000
 *
 * 示例 3：
 * 输入：x = 2.00000, n = -2
 * 输出：0.25000
 * 解释：2-2 = 1/22 = 1/4 = 0.25
 *
 * @param {*} x
 * @param {*} n
 * @returns
 */

/**
 * 快速幂
 * 快速幂的核心思想：反复平方法(类似你想二分，二分是每次在当前基础上减半，快速幂是每次在当前基础上扩大一倍)
 * @param {*} x
 * @param {*} n
 * @returns
 */

function myPow(x, n) {
  let res = 1;
  for (let i = Math.abs(n); i !== 0; i = Math.floor(i / 2)) {
    // 每次循环 n / 2
    // n = 4, 依次循环i % 2 值: [0, 0, 1];
    // n = 5, 依次循环i % 2 值: [1, 0, 1];
    if (i % 2 !== 0) {
      // 模数不为0，即奇数项或最后总积
      res *= x;
    }
    x *= x;
  }
  return n < 0 ? 1 / res : res;
}

// 快速幂
function qmi(x, n) {
  let res = 1;
  while (n) {
    if (n & 1) {
      res *= x;
    }
    x *= x;
    n = Math.floor(n / 2);
  }
  return res;
}

function myPow(x, n) {
  const res = qmi(x, Math.abs(n));
  return n < 0 ? 1 / res : res;
}

/**
 * 递归 + 二分
 * 时间复杂度为O(log n)，n为递归的层数。
 * 空间复杂度为O(log n)，n为递归的层数。因为递归的函数调用会使用栈空间。
 * @param {*} x
 * @param {*} n
 * @returns
 */

function myPow(x, n) {
  let N = n < 0 ? -n : n;
  let res = traval(x, N);
  return n < 0 ? 1 / res : res;
}

function traval(x, n) {
  if (n === 0) return 1;
  const val = traval(x, Math.floor(n / 2));
  return n % 2 ? val * val * x : val * val;
}

/**
 * 太慢了
 * @param {*} x
 * @param {*} n
 * @returns
 */
function myPow(x, n) {
  let left = 1;
  let right = Math.abs(n);
  let res = 1;
  while (left < right) {
    res *= x * x;
    left++;
    right--;
  }
  if (left === right) res *= x;
  return n < 0 ? 1 / res : res;
}
