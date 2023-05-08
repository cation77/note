/**
 * 翻转字符串里的单词
 * @param {string} s
 * @return {string}
 */
var reverseWords = function (s) {
  // 方法：双指针
  const arr = s.trim().split(/\s+/)
  let end = arr.length - 1
  let begin = 0
  while (begin + 1 <= end) {
    const temp = arr[begin]
    arr[begin] = arr[end]
    arr[end] = temp
    begin++
    end--
  }
  return arr.join(' ')
}

/**
 * 方法思路：数组的翻转
 * @param {string} s
 * @return {string}
 */
var reverseWords1 = function (s) {
  const arr = s.trim().split(/\s+/)
  const res = []
  let len = arr.length
  while (len-- > 0) {
    if (arr[len]) {
      res.push(arr[len])
    }
  }
  return res.join(' ')
};


const s = "the sky is blue"

console.log(reverseWords1(s))