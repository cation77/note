/**
 * 长度最小的子数组
 * 找出该数组中满足其和 ≥ target 的长度最小的 连续子数组 [numsl, numsl+1, ..., numsr-1, numsr] 并返回其长度
 * 如果不存在符合条件的子数组，返回 0 
 * @param {number} target
 * @param {number[]} nums
 * @return {number}
 */
var minSubArrayLen = function (target, nums) {
  let slow = 0
  let len = nums.length + 1
  let sum = 0
  for (let i = 0; i < nums.length; i++) {
    sum += nums[i]
    if (sum >= target) {
      while (1) {
        if (sum - nums[slow] >= target) {
          // sum -= nums[slow++]
          sum -= nums[slow]
          slow++
        } else {
          break
        }
      }
      if (i - slow + 1 < len) {
        len = i - slow + 1
      }
    }
  }
  return len < nums.length + 1 ? len : 0
}

// const target = 11, nums = [1, 1, 1, 1, 1, 1, 1, 1] // 输出：0

const target = 4, nums = [1, 4, 4] // 输出：1

// const target = 7, nums = [2, 3, 1, 2, 4, 3] // 输出：2

console.log(minSubArrayLen(target, nums))
