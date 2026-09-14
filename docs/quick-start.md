---
id: quick-start
title: 快速开始
---

按下面顺序即可跑通「节点 + 用户 + 订阅」。

## 1. 安装并登录

见 [安装与升级](/install)。使用管理员账号登录面板。

## 2. 确认 Mihomo 可用

进入 **核心管理**：

1. 确认 Mihomo 二进制路径正确（安装脚本通常已配置）
2. 点击 **启动** 或 **重启**
3. 状态应显示运行中

若启动失败，查看 **运行日志** 与 `journalctl -u 3m-ui -f`。

## 3. 创建 Listener（节点）

进入 **节点管理**：

- **一键创建（推荐）**：只选协议 + 名称，端口与凭证自动生成（VLESS 等默认 REALITY）
- **完整创建**：可自选端口、绑定地址、TLS/REALITY、Public Host/Port 等

保存后面板会生成/更新 Mihomo 配置并应用。详见 [节点管理](/listeners)。

## 4. 创建用户

进入 **用户管理** → 新建：

- 用户名、备注
- 流量上限（0 表示不限）
- 到期时间（空表示不限）
- IP 限制（可选）
- 绑定到一个或多个 Listener

保存后会生成 `sub_token` 与客户端凭据。

## 5. 获取订阅

在用户行打开分享 / 订阅：

| 类型 | 说明 |
|------|------|
| Mihomo / Clash | YAML 配置，适合 Clash Meta / Mihomo 客户端 |
| V2Ray | Base64 节点列表（可用 `?encrypt=0` 要明文） |
| Sing-box | JSON |
| HTML | 浏览器打开的信息页 |

订阅 URL 形态示例：

```text
https://你的面板或域名/api/v1/client/sub/<sub_token>
https://…/api/v1/client/v2ray/<sub_token>
https://…/api/v1/client/clash/<sub_token>
https://…/api/v1/client/json/<sub_token>
```

兼容短路径：`/sub/<token>`、`/clash/<token>`、`/json/<token>`。

详情见 [订阅](/subscription)。

## 6. （可选）加固

- 修改默认端口与 JWT / 凭据密钥 → [面板配置](/panel-config)
- 开启面板 HTTPS → [SSL与证书](/ssl-cert)
- 开启管理员 **TOTP 两步验证**、可选 **web_path** 路径前缀 → [安全建议](/security)
- 配置 Telegram 告警 → [Telegram-Bot](/telegram-bot)
- 只暴露反代后的域名，防火墙限制 8080
- 用户侧可配置 HWID 上限、首次使用起算、周期续期 → [用户与流量](/users-traffic)

## 6. 配置引擎（可选）

**配置** 页可预览 Mihomo YAML。建议流程：**生成 → 校验 → 应用**；不要把「生成」当成已经上线。失败时用 **回滚**。

