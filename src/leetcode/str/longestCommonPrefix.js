/**
 * 最长公共前缀
 * @param {string[]} strs
 * @return {string}
 */
var longestCommonPrefix = function (strs) {
  const len = strs[0].length
  let res = ''
  // 存在的最长公共前缀为最小长度的子串
  // 随机遍历一个子串的字符串长度，默认拿第一个元素的子串
  for (let i = 0; i < len; i++) {
    // 当所以子串对应下标字符相同则继续遍历，否则结束
    if (strs.every(str => strs[0][i] === str[i])) {
      res += strs[0][i]
    } else {
      break
    }
  }
  return res;
};

var longestCommonPrefix = function (strs) {
  let same = strs[0]
  for (let i = 0; i < strs.length; i++) {
    for (let j = 0; j < same.length; j++) {
      if (same[j] !== strs[i][j]) {
        same = same.slice(0, j)
        break
      }
    }
  }
  return same
};

const strs = ["flower", "flow", "flight"]
console.log(longestCommonPrefix(strs))
