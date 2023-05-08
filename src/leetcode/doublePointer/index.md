# 双指针

## 场景一

从两端向中间迭代数组，可以使用双指针技巧

> 一个指针从头部开始，而另一个指针从尾部开始。

```python
# 反转数组中的元素
def reverseString(self, s):
    i, j = 0, len(s) - 1
    while i < j:
        s[i], s[j] = s[j], s[i]
        i += 1
        j -= 1
```

## 场景二

> 快慢指针: 使用两个不同步的指针来解决问题，2个指针的运动方向是相同的
> 关键要确定两个指针的移动策略
> 与场景一类似，你有时可能需要在使用双指针技巧之前对数组进行排序，也可能需要运用贪心法则来决定你的运动策略。

```python
# 原地移除所有数值等于 val 的元素
# 使用了两个指针，一个用于原始数组的迭代，另一个总是指向新数组的最后一个位置
def removeElement(self, nums: List[int], val: int) -> int:
    slow = 0
    n = len(nums)
    for fast in range(n):
        if nums[fast] != val:
            nums[slow] = nums[fast]
            slow += 1
    return slow
```
