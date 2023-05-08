/**
 * 反转字符串
 * 必须原地修改输入数组、使用 O(1) 的额外空间解决
 * 
 * 思路：
 * 使用双指针从两端向中间迭代数组
 * @param {character[]} s
 * @return {void} Do not return anything, modify s in-place instead.
 */
var reverseString = function (s) {
  let i = 0
  let j = s.length - 1
  while (i < j) {
    [s[i], s[j]] = [s[j], s[i]]
    i++
    j--
  }
};

var reverseString = function (s) {
  let i = 0
  let j = s.length - 1
  while (i < j) {
    const temp = s[i]
    s[i] = s[j]
    s[j] = temp
    i++
    j--
  }
};

// const s = ["h", "e", "l", "l", "o"]
const s = ["H", "a", "n", "n", "a", "h"]

reverseString(s)
console.log(s)