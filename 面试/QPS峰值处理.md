---
title: QPS达到峰值处理
---

当系统QPS（每秒查询率）达到峰值时，需要从前端到后端全链路优化，结合限流、降级、扩容等手段保障系统稳定。以下是分层次的解决方案：

---

### **一、前端层优化：减少无效请求压力**

1. **请求合并与节流**  
   - **防抖与节流**：高频操作（如搜索框输入）使用防抖（`debounce`）或节流（`throttle`），减少无效请求。  
   - **批量请求**：将多个接口合并为单个请求（如GraphQL Batching），减少HTTP连接数。  

2. **静态资源优化**  
   - **CDN加速**：将图片、JS/CSS等静态资源托管至CDN，降低源站压力。  
   - **客户端缓存**：通过`Cache-Control`（强缓存）、`ETag`（协商缓存）减少重复请求。  

3. **兜底策略**  
   - **降级展示**：若接口超时或失败，展示本地缓存数据或默认内容（如骨架屏）。  
   - **优雅降级**：关闭非核心功能（如动画、统计上报），优先保障核心链路可用。

---

### **二、网关层：流量管控与分发**

1. **限流策略**  
   - **令牌桶/漏桶算法**：通过Nginx或API网关（如Kong）限制每秒请求数。  
   - **IP/用户分级限流**：对异常IP或低优先级用户实施更严格的限流。  

2. **负载均衡**  
   - **动态权重调整**：根据服务器负载情况（CPU、内存）动态分配流量（如Nginx的`least_conn`策略）。  
   - **多区域容灾**：通过DNS轮询或Anycast将流量分发至不同地域的服务器。  

3. **熔断机制**  
   - **服务熔断**：当下游服务失败率超过阈值时，暂时切断请求（如Hystrix）。  
   - **快速失败**：直接返回预设错误码（如HTTP 503），避免请求堆积。

---

### **三、服务层：异步处理与扩容**

1. **异步解耦**  
   - **消息队列削峰**：将非实时请求写入Kafka/RabbitMQ，由消费者异步处理（如订单创建后发MQ通知）。  
   - **请求队列化**：使用Redis List或内存队列缓冲瞬时高峰请求，逐步消费。  

2. **水平扩展**  
   - **自动扩缩容**：基于Kubernetes HPA（Horizontal Pod Autoscaler）根据CPU/内存指标自动扩容Pod。  
   - **无状态化设计**：确保服务无状态，便于快速扩容（Session存储至Redis）。  

3. **缓存优化**  
   - **多级缓存**：本地缓存（Caffeine） + 分布式缓存（Redis） + 数据库缓存（MySQL Query Cache）。  
   - **热点Key探测**：通过监控识别热点数据（如秒杀商品），提前预热缓存。

---

### **四、数据库层：读写分离与分库分表**

1. **读写分离**  
   - 主库处理写操作，从库处理读操作（通过MyCAT或ShardingSphere代理）。  
2. **分库分表**  
   - 按业务垂直拆分（用户库、订单库），按数据量水平拆分（如用户ID取模分表）。  
3. **连接池优化**  
   - 调整数据库连接池参数（如`maxActive`、`maxWait`），避免连接耗尽。

---

### **五、监控与容灾**

1. **实时监控**  
   - **指标采集**：Prometheus监控QPS、RT（响应时间）、错误率、CPU/Memory。  
   - **日志分析**：通过ELK（Elasticsearch+Logstash+Kibana）追踪慢查询和异常请求。  
2. **预案演练**  
   - **压测与预案**：定期通过JMeter模拟高峰流量，验证限流、降级、扩容预案。  
   - **多活架构**：异地多活部署（如阿里云单元化架构），避免单点故障。

---

### **六、实战场景示例**

**场景：电商秒杀活动QPS突增至10万**  

1. **前端**：按钮置灰+倒计时，防止重复提交；静态资源预加载至CDN。  
2. **网关**：限流（每秒放行1万请求），超出部分返回“活动太火爆，请重试”。  
3. **服务层**：秒杀请求写入Redis队列，异步返回排队状态；库存扣减采用Redis+Lua原子操作。  
4. **数据库**：库存数据预加载至Redis，DB仅用于最终订单持久化。  

---

### **总结**

应对QPS峰值的关键在于：  

1. **分层防御**：从前端到数据层逐层过滤、缓冲请求。  
2. **快速失败**：避免雪崩效应，优先保障核心功能。  
3. **弹性架构**：通过自动化扩缩容和异步处理提升系统吞吐量。  
4. **预案先行**：通过压测提前暴露瓶颈，完善降级和容灾策略。
