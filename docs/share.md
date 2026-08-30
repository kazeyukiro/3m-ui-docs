---
id: share
title: 分享与订阅
---

3M-UI 支持为每个代理用户生成订阅链接和节点分享 URI，方便客户端一键导入。

## 订阅链接

每个代理用户在「用户管理」中创建后会自动生成唯一的订阅 Token。典型地址格式：

```
/api/v1/client/sub/<token>
```

支持的订阅格式：

| 参数 | 格式 | 适用客户端 |
|------|------|-----------|
| 默认 | Clash / Mihomo YAML | Clash 系列、Mihomo |
| `?target=v2ray` | V2Ray Base64 | v2rayN、Hiddify |
| `?target=singbox` | Sing-box JSON | sing-box |
| `?target=clash` | Clash YAML | Clash 系列 |

## 节点分享 URI

在「节点管理」列表中，点击节点的「复制订阅链接」按钮可获取该节点的分享 URI。支持多用户批量导出。

## 安全提示

订阅 Token 等同于密码，泄露后应立即在用户管理中轮换或删除。
