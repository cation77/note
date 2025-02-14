---
title: 实现 loadsh.get 方法
---

`lodash.get` 方法用于安全地访问对象的嵌套属性。它的基本功能是根据给定的路径返回对象中对应的值，如果路径不存在，则返回默认值（可选）。

下面是 `lodash.get` 方法的简单实现：

```javascript
function get(obj, path, defaultValue) {
    // 将路径转换为数组
    const keys = Array.isArray(path) ? path : path.split('.');

    // 通过逐层访问对象的属性
    let result = obj;
    for (const key of keys) {
        // 如果当前对象为 null 或 undefined，返回默认值
        if (result == null) {
            return defaultValue;
        }
        result = result[key];
    }

    // 如果最终结果为 undefined，返回默认值
    return result === undefined ? defaultValue : result;
}

// 示例使用
const data = {
    user: {
        profile: {
            name: 'Alice',
            age: 30
        }
    }
};

console.log(get(data, 'user.profile.name')); // 输出: "Alice"
console.log(get(data, 'user.profile.email', 'No email')); // 输出: "No email"
console.log(get(data, ['user', 'profile', 'age'])); // 输出: 30
console.log(get(data, 'user.settings.theme', 'light')); // 输出: "light"
```

### 代码说明

1. **路径处理**：
   - 如果路径是数组，直接使用它；否则，将路径字符串按 `.` 分割成数组。

2. **逐层访问**：
   - 使用 `for...of` 循环遍历路径的每一层。
   - 检查当前对象是否为 `null` 或 `undefined`，如果是则返回默认值。

3. **返回结果**：
   - 如果最终得到的结果为 `undefined`，则返回默认值；否则返回找到的值。

### 示例

- 访问存在的属性：

  ```javascript
  console.log(get(data, 'user.profile.name')); // 输出: "Alice"
  ```

- 访问不存在的属性，并提供默认值：

  ```javascript
  console.log(get(data, 'user.profile.email', 'No email')); // 输出: "No email"
  ```

- 使用数组形式的路径：

  ```javascript
  console.log(get(data, ['user', 'profile', 'age'])); // 输出: 30
  ```

这种实现方式能够有效处理嵌套对象的属性访问，并提供了安全性。
