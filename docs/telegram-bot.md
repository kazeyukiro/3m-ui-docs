---
id: telegram-bot
title: Telegram Bot
---

## 配置

1. 在 [@BotFather](https://t.me/BotFather) 创建 Bot，获取 Bot Token。
2. 获取你的数字 Telegram 用户 ID（给 Bot 发 `/id` 即可获取）。
3. 在面板「系统设置 → Telegram 通知」中填入 Token 和 Chat ID（多个用逗号分隔）。
4. 保存后点「注册命令菜单」让 Telegram 客户端显示命令补全。
5. 点击「发送测试消息」验证连接。

## 命令

| 命令 | 权限 | 功能 |
|------|------|------|
| `/start` `/help` | 所有人 | 显示帮助 + 内联按钮菜单 |
| `/status` | 所有人 | 确认 Bot 在线 |
| `/id` | 所有人 | 显示你的 Telegram 数字 ID |
| `/usage` | 管理员 | 搜索用户用量 |
| `/usage` | 已绑定用户 | 查询自己的用量/到期/订阅链接 |
| `/users` | 管理员 | 用户列表 |
| `/online` | 管理员 | 在线用户 |
| `/listeners` | 管理员 | 节点列表 |
| `/traffic` | 管理员 | 流量快照 |
| `/restart` | 管理员 | 重启 Mihomo 核心 |
| `/deldepleted` | 管理员 | 清理到期/超额用户 |
| `/search <关键字>` | 管理员 | 按用户名/备注搜索 |
| `/backup` | 管理员 | 备份提示 |

## 内联按钮

管理员菜单（8 按钮）：状态、用户、流量、在线、节点、清理、备份、重启。
用户菜单（2 按钮）：我的用量、订阅链接。

## 定期报告

通过 `schedule` 字段设置 cron 表达式或预设：

| 表达式 | 含义 |
|--------|------|
| `@daily` | 每天午夜 |
| `@hourly` | 每小时整点 |
| `@every 6h` | 每 6 小时 |
| `0 9 * * *` | 每天 9:00 |
| `*/30 * * * *` | 每 30 分钟 |

支持的 cron 语法：`*`、逗号列表、`*/N`（步进）、`A-B`（范围）、`A-B/N`（步进范围）。

## 事件告警

通过 `enabled_events` 选择要接收的事件（默认 `login,cpu,crash`）：

| 事件 | 触发 |
|------|------|
| `login` | 面板登录成功和失败 |
| `cpu` | CPU 超过阈值 |
| `memory` | 内存超过阈值 |
| `crash` | Mihomo 核心崩溃（非正常退出） |
| `expiry` | 用户即将到期 |
| `traffic` | 用户流量即将耗尽 |

## 用户绑定

在「用户管理」中为代理用户绑定 Telegram ID。绑定后用户可通过 Bot 自助查询用量和订阅链接。

API：
```
PUT /api/v1/users/:id/telegram  { telegram_id, telegram_name }
DELETE /api/v1/users/:id/telegram
```

## 代理支持

Bot 支持 HTTP/HTTPS/SOCKS5 代理连接 Telegram API。在 `proxy_url` 字段填入：

- `http://host:port`
- `socks5://host:port`

## 自定义 API 服务器

`api_server` 字段可设置自定义 Telegram Bot API 服务器地址（留空使用官方 `https://api.telegram.org`）。

## 安全提示

- Bot Token 掌控着你的 Bot，务必妥善保密。
- 仅添加可信的管理员 Chat ID。
- 登录告警不包含密码。
- Bot 对管理员的失败操作不会发送密码或密钥信息。
