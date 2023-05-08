/**
 * 字符串匹配算法：KMP
 * 时间复杂度是 O(m+n)
 * @param {*} s 
 * @param {*} p 
 * @returns 
 */
function match(s, p) {
  const next = buildNext(p)
  const sLen = s.length
  const pLen = p.length
  let i = 0
  let j = 0
  while (i < sLen && j < pLen) {
    // console.log(i, j)
    if (j < 0 || s[i] === p[j]) {
      i++
      j++
    } else {
      j = next[j]
    }
  }
  return j === pLen ? i - j : -1
}

function buildNext(p) {
  const next = []
  let t = -1
  let j = 0
  next[0] = -1
  while (j < p.length - 1) {
    if (t < 0 || p[j] === p[t]) {
      t++
      j++
      next[j] = t
    } else {
      t = next[t]
    }
  }
  return next
}

const s = 'ACTGPACTGKACTGPACY'
const p = 'ACTGPACY'

console.log(match(s, p))