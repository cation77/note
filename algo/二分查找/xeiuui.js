/**
 * 寻找比目标字母大的最小字母
 * 给你一个字符数组 letters，该数组按非递减顺序排序，以及一个字符 target。letters 里至少有两个不同的字符。
 * 返回 letters 中大于 target 的最小的字符。如果不存在这样的字符，则返回 letters 的第一个字符。
 *
 * 示例 1：
 * 输入: letters = ["c", "f", "j"]，target = "a"
 * 输出: "c"
 *
 * 示例 2:
 * 输入: letters = ["c","f","j"], target = "c"
 * 输出: "f"
 *
 * 示例 3:
 * 输入: letters = ["x","x","y","y"], target = "z"
 * 输出: "x"
 *
 * @param {*} letters
 * @param {*} target
 * @returns
 */

function nextGreatestLetter(letters, target) {
  let left = 0;
  let right = letters.length - 1;
  while (left < right) {
    const mid = left + ((right - left) >> 1);
    if (letters[mid] <= target) {
      left = mid + 1;
    } else {
      right = mid;
    }
  }
  return letters[left] <= target ? letters[0] : letters[left];
}

function nextGreatestLetter(letters, target) {
  const len = letters.length;
  if (letters[len - 1] <= target) {
    return letters[0];
  }
  let left = 0;
  let right = len - 1;
  let res = '';
  while (left <= right) {
    const mid = left + ((right - left) >> 1);
    if (letters[mid] > target) {
      res = letters[mid];
      right = mid - 1;
    } else {
      left = mid + 1;
    }
  }
  return res;
}
