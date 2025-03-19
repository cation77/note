---
title: hash 碰撞
---

所谓哈希（hash），就是将不同的输入映射成独一无二的、固定长度的值（又称"哈希值"）。它是最常见的软件运算之一。

如果不同的输入得到了同一个哈希值，就发生了"哈希碰撞"（collision）

## 哈希碰撞的公式

![一般化公式](../assets/bg2018090508.png)

```javascript
// 哈希值一般由大小写字母和数字构成，一共有62个字符
// d 是取值空间，如果哈希值只有3个字符，取值空间为 62^3
// n 是计算次数
const calculate = (d, n) => {
  const exponent = (-n * (n - 1)) / (2 * d)
  return 1 - Math.E ** exponent;
}

calculate(62^5, 10000) // 0.05310946204730993
```

## 参考

1. [哈希碰撞与生日攻击](https://ruanyifeng.com/blog/2018/09/hash-collision-and-birthday-attack.html)
