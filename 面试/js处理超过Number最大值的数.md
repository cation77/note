---
title: js 处理超过 Number 最大值的数
---

在 JavaScript 中，`Number` 类型的最大安全整数是 **`Number.MAX_SAFE_INTEGER`**（即 `2^53 - 1`，约 `9,007,199,254,740,991`），超过这个值的整数会出现精度丢失。若要处理超大整数或高精度数值，可以采用以下方案：

---

### **一、使用 `BigInt` 类型（ES6+）**

**适用场景**：精确表示和操作超出 `Number` 范围的**整数**。

```javascript
// 定义 BigInt（在数字末尾加 `n` 或调用构造函数）
const hugeNumber = 9007199254740992n; // 直接字面量
const anotherHuge = BigInt("123456789012345678901234567890"); // 字符串转换

// 运算（注意：BigInt 不能与 Number 直接混合运算）
const sum = hugeNumber + anotherHuge; // ✅ 正确
const error = hugeNumber + 1;        // ❌ 报错（需改为 1n）

// 比较
console.log(hugeNumber > 1000n); // true

// 转换为字符串（用于网络传输或显示）
const str = hugeNumber.toString(); // "9007199254740992"
```

**注意**：

- 仅支持整数，不支持小数。
- 兼容性：现代浏览器和 Node.js 10+ 支持，旧环境需 Babel 转译。

---

### **二、使用第三方高精度库**

**适用场景**：需要处理**小数**或更复杂的数学运算（如金融计算）。

#### 1. **`bignumber.js`**

```javascript
import BigNumber from "bignumber.js";

// 初始化
const a = new BigNumber("12345678901234567890.12345");
const b = new BigNumber("98765432109876543210.67890");

// 运算
const sum = a.plus(b);    // 加法
const product = a.times(b); // 乘法

// 格式化输出
console.log(sum.toFormat(2)); // "111,111,111,011,111,111,100.80"
```

#### 2. **`decimal.js`**

```javascript
import Decimal from "decimal.js";

const a = new Decimal("0.1");
const b = new Decimal("0.2");
console.log(a.plus(b).equals(0.3)); // true（避免浮点误差）
```

**优点**：

- 支持高精度小数和整数。
- 提供丰富的数学函数（如取模、幂运算、四舍五入）。

---

### **三、字符串处理（简单场景）**

**适用场景**：仅需存储或传输大数，不进行数学运算。

```javascript
// 将大数以字符串形式存储
const bigNumStr = "123456789012345678901234567890";

// 自定义运算函数（需手动实现加法、乘法等）
function addStrings(a, b) {
  // 实现字符串加法逻辑...
}

const result = addStrings(bigNumStr, "987654321");
```

**缺点**：

- 运算需手动实现，容易出错。
- 不适合复杂计算。

---

### **四、科学计数法（仅限展示）**

**适用场景**：显示超大数时简化表示。

```javascript
const hugeNumber = 1e30; // 1后跟30个零（但精度已丢失）
console.log(hugeNumber.toExponential()); // "1e+30"
```

**注意**：

- 会丢失精度，仅适用于展示。

---

### **五、处理 JSON 中的大数**

**问题**：JSON 无法直接序列化 `BigInt`。
**解决方案**：自定义解析逻辑。

```javascript
const data = { id: 12345678901234567890n };

// 序列化时将 BigInt 转为字符串
const jsonString = JSON.stringify(data, (key, value) => {
  return typeof value === "bigint" ? value.toString() : value;
});
// 结果：{"id":"12345678901234567890"}

// 反序列化时恢复为 BigInt
const parsedData = JSON.parse(jsonString, (key, value) => {
  return typeof value === "string" && /^\d+n?$/.test(value) 
    ? BigInt(value.replace('n', '')) 
    : value;
});
```

---

### **六、总结**

| 方案 | 适用场景 | 优点 | 缺点 |
|------|----------|------|------|
| `BigInt` | 大整数运算 | 原生支持，无依赖 | 不支持小数，旧环境需转译 |
| `bignumber.js`/`decimal.js` | 高精度小数、复杂运算 | 功能全面 | 需引入第三方库 |
| 字符串 | 存储/传输 | 简单 | 无法直接运算 |
| 科学计数法 | 展示 | 易读 | 精度丢失 |

**建议**：

- 若需处理**整数**，优先使用 `BigInt`。
- 若需处理**小数**或复杂运算，选择 `bignumber.js` 或 `decimal.js`。
- 仅存储或传输时，使用字符串。
