/**
* 贪心算法:
* 1.数组最小值肯定保留，那么为了不浪费别的数，就给比最小值大一点数。
* 2.去掉这两个后，剩下的肯定还有最小值，同理得排完序后奇数位置的和就是所求 
*/


/**
 * 数组拆分 I
 * 先排序，后取 i % 2 === 0 元素之和
 * @param {number[]} nums
 * @return {number}
 */
var arrayPairSum = function (nums) {
  nums.sort((a, b) => a - b)
  let sums = 0
  for (let i = 0; i < nums.length;) {
    sums += nums[i]
    i += 2
  }
  return sums
};

const nums = [6, 2, 6, 5, 1, 2]

console.log(arrayPairSum(nums))