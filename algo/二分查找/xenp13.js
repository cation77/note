/**
 * 在排序数组中查找元素的第一个和最后一个位置
 * 给你一个按照非递减顺序排列的整数数组 nums，和一个目标值 target。请你找出给定目标值在数组中的开始位置和结束位置。
 * 如果数组中不存在目标值 target，返回 [-1, -1]。
 *
 * 示例 1：
 * 输入：nums = [5,7,7,8,8,10], target = 8
 * 输出：[3,4]
 *
 * 示例 2：
 * 输入：nums = [5,7,7,8,8,10], target = 6
 * 输出：[-1,-1]
 *
 * @param {*} nums
 * @param {*} target
 * @returns
 */

function searchRange(nums, target) {
  let left = 0;
  let right = nums.length - 1;

  while (left + 1 < right) {
    const mid = left + Math.floor((right - left) / 2);
    if (nums[mid] > target) {
      right = mid;
    } else if (nums[mid] === target) {
      let l = mid;
      let r = mid;
      while (nums[--l] === target) {
        continue;
      }
      while (nums[++r] === target) {
        continue;
      }
      return [++l, --r];
    } else {
      left = mid;
    }
  }
  if (target === nums[left] && target === nums[right]) return [left, right];
  if (target === nums[left]) return [left, left];
  if (target === nums[right]) return [right, right];
  return [-1, -1];
}

function searchRange(nums, target) {
  let res = [];
  res[0] = leftSearch(nums, target);
  res[1] = rightSearch(nums, target);
  return res;
}

function leftSearch(nums, target) {
  let left = 0;
  let right = nums.length - 1;

  while (left + 1 < right) {
    const mid = left + Math.floor((right - left) / 2);
    if (nums[mid] < target) {
      left = mid;
    } else {
      right = mid;
    }
  }
  if (nums[left] === target) return left;
  if (nums[right] === target) return right;
  return -1;
}

function rightSearch(nums, target) {
  let left = 0;
  let right = nums.length - 1;

  while (left + 1 < right) {
    const mid = left + Math.floor((right - left + 1) / 2);
    if (nums[mid] <= target) {
      left = mid;
    } else {
      right = mid;
    }
  }
  if (nums[right] === target) return right;
  if (nums[left] === target) return left;
  return -1;
}
