/**
 * 最长回文子串
 * 中心扩散法：
 * 分为奇数串('aba')和偶数串(’abba‘)两种情况
 * 把每个字符当做回文串中间的字符，由内向外延展比较(定义由内向外的两个索引值)
 * @param {string} s
 * @return {string}
 */
var longestPalindrome = function (s) {
  const len = s.length
  if (len <= 1) return s
  let res = ''
  for (let i = 0; i < len; i++) {
    // 奇数串
    const tem1 = isPalindrome(s, i, i)
    // 偶数串
    const tem2 = isPalindrome(s, i, i + 1)
    // 判断长度，获取最长回文子串
    if (tem1.length > res.length) {
      res = tem1
    }
    if (tem2.length > res.length) {
      res = tem2
    }
  }
  return res
};

function isPalindrome(s, left, right) {
  // 由内向外延展比较
  // 定义由内向外的两个索引值 left right
  while (left >= 0 && right < s.length && s[left] === s[right]) {
    // 当s[left] === s[right]时，向2边延展
    left--
    right++
  }
  // return [left + 1, right - 1]
  return s.slice(left + 1, right)
}


/**
 * @param {string} s
 * @return {string}
 */
var longestPalindrome = function (s) {
  if (s.length <= 1) return s;
  let left = 0;
  let right = 0;
  for (let i = 0; i < s.length; i++) {
    const [left1, right1] = isPalindrome(s, i, i);
    const [left2, right2] = isPalindrome(s, i, i + 1);
    if (right1 - left1 > right - left) {
      right = right1
      left = left1
    }
    if (right2 - left2 > right - left) {
      right = right2
      left = left2
    }
  }
  return s.slice(left, right + 1)
};

function isPalindrome(s, left, right) {
  while (left >= 0 && right < s.length && s[left] === s[right]) {
    left--
    right++
  }
  return [left + 1, right - 1]
}