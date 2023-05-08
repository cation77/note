/**
 * 对角线遍历
 * 得出遍历的次数，也就是对角线的条数为 i = row + col - 1
 * 每次遍历的对角线上的每个元素下标之和为 i
 * @param {number[][]} mat
 * @return {number[]}
 */
var findDiagonalOrder = function (mat) {
  const row = mat.length // 行数
  const col = mat[0].length // 列数
  const diagonal = row + col - 1 // 对角线条数，以第一行和最右边列为每条对角线端点，计算条数时把重合点减去1即可
  const res = []
  let r = 0;
  let c = 0;
  for (let i = 0; i < diagonal; i++) {
    // 遍历对角线，每次遍历的对角线上的每个元素下标之和为i
    if (i % 2 === 0) {
      // 偶数对应的对角线上的元素是从下往上遍历
      for (let j = r; j >= i - c; j--) {
        res.push(mat[j][i - j])
      }
    } else {
      for (let j = c; j >= i - r; j--) {
        res.push(mat[i - j][j])
      }
    }
    // 注意边界问题，当达到 row - 1 或 col - 1 时是元素下标最大值
    r = r >= row - 1 ? row - 1 : r + 1
    c = c >= col - 1 ? col - 1 : c + 1
  }
  return res;
};

const mat = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]

console.log(findDiagonalOrder(mat))