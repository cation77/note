/**
 * 旋转矩阵
 * https://leetcode.cn/problems/rotate-image/
 * @param {number[][]} matrix
 */

var rotate = function (matrix) {
  const len = matrix.length
  // 1. 对角翻转
  for (let i = 0; i < len; i++) {
    for (let j = 0; j <= i; j++) {
      [matrix[i][j], matrix[j][i]] = [matrix[j][i], matrix[i][j]]

    }
  }
  // 2. 镜像翻转
  for (let i = 0; i < len; i++) {
    for (let j = 0; j < len / 2; j++) {
      [matrix[i][j], matrix[i][len - j - 1]] = [matrix[i][len - j - 1], matrix[i][j]]
    }
  }
};
