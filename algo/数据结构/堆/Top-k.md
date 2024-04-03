---
title: Top-k
---

> 给定一个长度为 $n$ 的无序数组 nums ，请返回数组中最大的 $k$ 个元素

## 堆

总共执行了 $n$ 轮入堆和出堆，堆的最大长度为 $k$，因此时间复杂度为 $O(n \log k)$。该方法的效率很高，当 $k$ 较小时，时间复杂度趋向 $O(n)$；当 $k$ 较大时，时间复杂度不会超过 $O(n \log k)$。

> 为什么前k大的元素需要小根堆而不是大根堆
> 因为如果使用大根堆，我们每轮只能替换最大元素；而使用小根堆，我们每轮替换的是“第 K 大的元素”

```javascript
/* 元素入堆 */
function pushMinHeap(maxHeap, val) {
  // 元素取反
  maxHeap.push(-val);
}

/* 元素出堆 */
function popMinHeap(maxHeap) {
  // 元素取反
  return -maxHeap.pop();
}

/* 访问堆顶元素 */
function peekMinHeap(maxHeap) {
  // 元素取反
  return -maxHeap.peek();
}

/* 取出堆中元素 */
function getMinHeap(maxHeap) {
  // 元素取反
  return maxHeap.getMaxHeap().map((num) => -num);
}

/* 基于堆查找数组中最大的 k 个元素 */
function topKHeap(nums, k) {
  // 初始化小顶堆
  // 将堆中所有元素取反，从而用大顶堆来模拟小顶堆
  const maxHeap = new MaxHeap();
  for (let i = 0; i < k; i++) {
    // 将数组的前 k 个元素入堆
    pushMinHeap(maxHeap, nums[i]);
  }
  // 从第 k+1 个元素开始，保持堆的长度为 k
  for (let i = k; i < nums.length; i++) {
    // 若当前元素大于堆顶元素，则将堆顶元素出堆、当前元素入堆
    if (nums[i] > peekMinHeap(maxHeap)) {
      popMinHeap(maxHeap);
      pushMinHeap(maxHeap, nums[i]);
    }
  }
  // 返回堆中元素
  return getMinHeap(maxHeap);
}
```
