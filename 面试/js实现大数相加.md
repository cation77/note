---
title: js实现大数相加
---

在 JavaScript 中实现大数相加，可以通过字符串来处理，因为 JavaScript 的数字类型在处理非常大的整数时可能会出现精度问题。以下是一个简单的实现示例：

```javascript
function addBigNumbers(num1, num2) {
    let carry = 0; // 进位
    let result = '';
    
    // 将两个数字反转，使得从最低位开始相加
    num1 = num1.split('').reverse();
    num2 = num2.split('').reverse();
    
    const maxLength = Math.max(num1.length, num2.length);
    
    for (let i = 0; i < maxLength; i++) {
        const digit1 = parseInt(num1[i] || '0', 10); // 获取第 i 位数字
        const digit2 = parseInt(num2[i] || '0', 10); // 获取第 i 位数字
        
        const sum = digit1 + digit2 + carry; // 当前位的和
        result += sum % 10; // 当前位的结果
        carry = Math.floor(sum / 10); // 更新进位
    }
    
    // 如果还有进位，添加到结果中
    if (carry) {
        result += carry;
    }
    
    // 反转结果并返回
    return result.split('').reverse().join('');
}

// 示例
const num1 = "123456789012345678901234567890";
const num2 = "987654321098765432109876543210";
console.log(addBigNumbers(num1, num2)); // 输出：1111111110111111111011111111100
```

### 代码说明

1. **反转字符串**：将输入的两个大数反转，以便从最低位开始相加。
2. **逐位相加**：使用循环遍历每位数字，计算和并处理进位。
3. **处理进位**：如果最后还有进位，添加到结果中。
4. **反转结果**：最后将结果反转回来并返回。

### 使用方法

你可以调用 `addBigNumbers` 函数，将两个大数作为字符串传入，即可得到它们的和。这个方法适用于处理任意大小的整数。
