---
id: subscription
title: 订阅
---

## 链接长什么样

大致是：

```text
http(s)://面板地址/api/v1/client/sub/<token>
```

用浏览器打开且 Accept 偏向 HTML 时，可能看到订阅说明页；Clash / 部分客户端则直接拿配置。

## 格式

不带参数时，多半按 User-Agent 猜：

- Clash / Mihomo → YAML
- 部分 v2ray 系 → Base64 URI 列表
- sing-box → JSON

也可以强制：

```text
?target=clash
?target=v2ray
?target=singbox
?target=html
```

响应头里常有 `Subscription-Userinfo`（流量、到期），客户端认的话会显示。

## 注意

- token 当密码看，不要贴到公开地方
- 改了节点或用户绑定，让客户端更新/重拉订阅
- 自签 TLS 的节点，导出里一般会带跳过证书校验；换了证书要重新拉一次
