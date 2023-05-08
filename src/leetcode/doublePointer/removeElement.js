/**
 * 移除元素
 * 给你一个数组 nums 和一个值 val，你需要 原地 移除所有数值等于 val 的元素，并返回移除后数组的新长度。
 * 不要使用额外的数组空间，你必须仅使用 O(1) 额外空间并 原地 修改输入数组。
 * 
 * 思路：
 * 使用快慢指针
 * @param {number[]} nums
 * @param {number} val
 * @return {number}
 */
var removeElement = function (nums, val) {
  let slow = 0;
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] !== val) {
      nums[slow] = nums[i]
      slow++
    }
  }
  return slow
};

var removeElement = function (nums, val) {
  let slow = 0;
  let fast = 0;
  while (fast < nums.length) {
    fast++
    if (nums[fast] !== val) {
      nums[slow] = nums[fast]
      slow++
    }
  }
  return slow
};

const nums = [0, 1, 2, 2, 3, 0, 4, 2]
const val = 2
console.log(removeElement(nums, val)) // 输出：5