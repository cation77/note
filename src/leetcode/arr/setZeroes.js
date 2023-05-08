/**
 * 零矩阵
 * 每次找到等于零的那一个把对应的行和列都置零即可，但是会出现一个问题就是到最后所有的元素都变成零了；
 * 因此，既然打算将整行和整列清零，因此并不需要标记录它是cell[2][4]（行2，列4），
 * 只需要知道行2有个元素为0，列4有个元素为0.不管怎样，整行和整列都要清零，又何必要记录零元素的确切位置
 * @param {number[][]} matrix
 */
var setZeroes = function (matrix) {
  let row = []
  let column = []
  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[0].length; j++) {
      if (matrix[i][j] === 0) {
        row[i] = true;
        column[j] = true;
      }
    }
  }

  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[0].length; j++) {
      if (row[i] || column[j]) {
        matrix[i][j] = 0;
      }
    }
  }
};

const matrix = [
  [0, 1, 2, 0],
  [3, 4, 5, 2],
  [1, 3, 1, 5]
]

setZeroes(matrix)

console.log(matrix)