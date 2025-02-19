---
title: HTML 自定义数据属性

---

## 自定义数据属性

以 `data-` 开头的元素属性是 HTML5 的自定义数据属性

### 语法示例

```html
<div id="user" data-id="1234567890" data-user="johndoe" data-date-of-birth>
  John Doe
</div>
```

### 访问 `data-` 属性

#### 1. 使用 JavaScript

你可以使用 `dataset` 属性访问 `data-` 属性：

```javascript
const product = document.getElementById('product');
console.log(product.dataset.id);    // 输出: 1234567890
console.log(product.dataset.user);  // 输出: johndoe
product.dataset.dateOfBirth = "1960-10-03";
```

#### 2. 使用 jQuery

如果你使用 jQuery，可以使用 `data()` 方法：

```javascript
const productId = $('#product').data('id');   // 输出: 1234567890
const productName = $('#product').data('user'); // 输出: johndoe
const dateOfBirth = $('#product').data('user'); // 输出: 1960-10-03
```

### 使用场景

1. **存储配置或参数**：
   - 可以用来存储与元素相关的配置或参数，例如 AJAX 请求的 URL。

2. **状态管理**：
   - 在单页面应用中，使用 `data-` 属性存储组件状态或标识。

3. **事件处理**：
   - 在事件处理程序中，通过 `data-` 属性传递信息。

## 参考

1. [HTMLElement.dataset](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLElement/dataset)
