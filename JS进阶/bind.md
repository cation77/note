---
title: bind
---

## 实现 bind 方法

```javascript
Function.prototype.bind2 = function (context) {
  const self = this;
  const args = Array.prototype.slice.call(arguments, 1); // 用slice方法取第二个到最后一个参数（获取除了this指向对象以外的参数）
  const fb = function () {
    const restArgs = Array.prototype.slice.call(arguments);
    // 作为普通函数调用时，this 指向 window，结果为 false；
    // 作为构造函数调用时，this 指向实例，实例的 `__proto__` 属性指向构造函数的 prototype，结果为 true
    return self.apply(
      self instanceof fb ? this : context,
      args.concat(restArgs)
    );
  };

// 借助 Object.setPrototypeOf
// Object.setPrototypeOf(fb, this.prototype)

  // 用一个空函数 fn 作为中间变量
  const fn = function () {};
  // 使中间变量 fn 的 prototype 指向绑定函数的 prototype
  fn.prototype = this.prototype;
  // 再使返回函数的 prototype 指向 fn 的实例，通过中间变量 fn 来维护原型关系
  fb.prototype = new fn();
  return fb;
};
```

## 参考

1. [bind 的实现](http://juejin.cn/post/7158009281735262239)
