/*
 * 编写一个函数，返回 x 的平方根。
 * 要求:
 *  - 你不可以使用任何 built-in 数学函数或库 (Math.sqrt)
 *  - 你的函数需要有 O(log n) 时间复杂度
 *  - 你的函数需要使用二分查找算法
 *  - 由于返回类型是整数，结果只保留整数部分，小数部分将被舍去 。
 *  - 结果数需要向下取整
 */

function mySqrt(x) {
  let left = 0;
  let right = x;
  let ans = -1;
  while (left <= right) {
    // 不使用 right + left 计算，是防止 right + left 可能会超出最大值
    const mid = Math.floor((right - left) / 2) + left;
    if (mid * mid <= x) {
      // 找到了正确的答案，right 往左搜索
      ans = mid;
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }
  return ans;
}

/**
 * -> 关于为什么返回 right：
 * while (left <= right)，这种写法，执行最后一次循环时，left == right == mid，
 * 因为非 return 形式的退出循环，说明 x 不为完全平方数，那么最终只会导致 left+1 或者 right-1，
 * 无论怎样都给出了 x 的算数平方根在大于 right & 小于 left 之间，且 right 是小于 left 的，
 * 向下取整那么则返回 right
 */

function mySqrt1(x) {
  let left = 0;
  let right = x;
  while (left <= right) {
    const mid = Math.floor((right - left) / 2) + left;
    if (mid * mid === x) {
      return mid;
    } else if (mid * mid < x) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }

  return right;
}

console.log(mySqrt1(9)); // 3
