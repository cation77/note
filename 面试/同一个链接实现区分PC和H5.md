---
title: 使用同一个链接，实现 PC 打开是 web 应用、手机打开是 H5 应用
---

要实现同一链接在PC端展示Web应用、在移动端展示H5应用，可通过 **设备类型检测 + 动态内容适配** 实现。以下是分步方案及代码示例：

---

### **一、核心思路**

1. **设备类型检测**：通过 **User-Agent** 或 **屏幕尺寸** 判断设备类型。
2. **动态渲染内容**：根据设备类型返回不同页面（服务端渲染）或动态加载不同组件（客户端渲染）。
3. **保持URL一致**：避免重定向，确保用户体验连贯。

---

### **二、具体实现方案**

#### **方案1：服务端动态渲染（推荐）**

**步骤**：服务端（如Node.js、Nginx）检测设备类型 → 返回对应HTML模板。  
**优势**：SEO友好，首屏加载性能更优。

##### **1. Node.js + Express 示例**

```javascript
const express = require('express');
const mobileDetect = require('mobile-detect');
const app = express();

// 中间件：检测设备类型
app.use((req, res, next) => {
  const md = new mobileDetect(req.headers['user-agent']);
  req.isMobile = !!md.mobile(); // 判断是否为移动设备
  next();
});

// 路由：根据设备返回不同页面
app.get('/', (req, res) => {
  if (req.isMobile) {
    res.sendFile(__dirname + '/mobile/index.html'); // H5页面
  } else {
    res.sendFile(__dirname + '/pc/index.html');     // PC页面
  }
});

app.listen(3000);
```

##### **2. Nginx配置示例**

```nginx
server {
  listen 80;
  server_name example.com;

  # 设备检测（基于User-Agent）
  set $device "pc";
  if ($http_user_agent ~* "(android|iphone|ipod|ipad|mobile)") {
    set $device "mobile";
  }

  # 根据设备类型返回不同根目录
  location / {
    root /var/www/$device;
    try_files $uri $uri/ /index.html;
  }
}
```

---

#### **方案2：客户端动态加载（SPA适用）**

**步骤**：前端根据设备类型动态加载不同组件。  
**优势**：无需服务端配置，适合单页应用（React/Vue）。

##### **React 示例**

```javascript
import React, { useEffect, useState } from 'react';
import PCVersion from './PCVersion';
import MobileVersion from './MobileVersion';

const App = () => {
  const [isMobile, setIsMobile] = useState(false);

  // 检测设备类型（组件挂载时）
  useEffect(() => {
    const checkDevice = () => {
      const mobileRegex = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
      setIsMobile(mobileRegex.test(navigator.userAgent));
    };
    checkDevice();
    window.addEventListener('resize', checkDevice);
    return () => window.removeEventListener('resize', checkDevice);
  }, []);

  return isMobile ? <MobileVersion /> : <PCVersion />;
};

export default App;
```

##### **Vue 示例**

```vue
<template>
  <component :is="currentView" />
</template>

<script>
import PCVersion from './PCVersion.vue';
import MobileVersion from './MobileVersion.vue';

export default {
  data() {
    return {
      isMobile: false
    };
  },
  computed: {
    currentView() {
      return this.isMobile ? MobileVersion : PCVersion;
    }
  },
  mounted() {
    this.checkDevice();
    window.addEventListener('resize', this.checkDevice);
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.checkDevice);
  },
  methods: {
    checkDevice() {
      const ua = navigator.userAgent;
      this.isMobile = /iPhone|iPad|iPod|Android|Mobile/i.test(ua);
    }
  }
};
</script>
```

---

#### **方案3：响应式布局 + 条件加载**

**步骤**：使用CSS媒体查询 + JavaScript按需加载模块。  
**适用场景**：PC/H5差异较小，仅需调整布局或部分功能。

```html
<!-- CSS媒体查询 -->
<style>
  .pc-content { display: block; }
  .mobile-content { display: none; }

  @media (max-width: 768px) {
    .pc-content { display: none; }
    .mobile-content { display: block; }
  }
</style>

<!-- 按需加载脚本 -->
<script>
  if (window.innerWidth <= 768) {
    import('./mobile-module.js').then(module => module.init());
  } else {
    import('./pc-module.js').then(module => module.init());
  }
</script>
```

---

### **三、关键注意事项**

1. **SEO优化**  
   - 服务端渲染方案需确保爬虫能获取正确内容，设置 `Vary: User-Agent` 响应头。
   - 使用 `rel="canonical"` 避免重复内容惩罚。

2. **设备检测准确性**  
   - **User-Agent检测**：推荐使用库（如 `mobile-detect`）提高准确性。
   - **屏幕尺寸检测**：结合 `window.innerWidth` 和 `window.matchMedia`，但需注意折叠屏设备。

3. **性能优化**  
   - **按需加载资源**：使用动态导入（`import()`）减少初始包体积。
   - **缓存策略**：对PC/H5资源设置不同缓存规则。

4. **用户体验**  
   - **避免布局抖动**：预先占位或加载骨架屏。
   - **保持状态同步**：若PC/H5切换涉及路由，需同步登录态、购物车等数据。

---

### **四、扩展：统一代码库管理**

若PC/H5功能差异大，可通过 **条件编译** 或 **目录分离** 维护代码：

```bash
src/
├── pc/           # PC端组件
├── mobile/       # H5端组件
└── shared/       # 公共逻辑
```

通过构建工具（Webpack/Vite）按需打包：

```javascript
// vite.config.js
export default {
  build: {
    rollupOptions: {
      input: {
        pc: 'src/pc/main.js',
        mobile: 'src/mobile/main.js'
      }
    }
  }
};
```

---

### **总结**

- **优先服务端渲染**：适合SEO敏感型应用，设备检测更可靠。
- **客户端动态加载**：适合SPA，灵活性高但需处理状态同步。
- **响应式布局补充**：简单差异场景下可作为辅助方案。
