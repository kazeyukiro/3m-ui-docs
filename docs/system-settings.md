---
id: system-settings
title: 系统设置
---

面板 **系统设置** 按二级目录组织（多数存数据库，不必改 `config.yaml`）。

## 面板 / UI

- **面板端口**、**监听地址**、**面板公网 URL**
- 写入 `/etc/3m-ui/config.yaml` 的 `server.port` / `listen` / `public_url`
- **面板路径前缀（web_path）**：可选，将管理界面挂在自定义路径下（见 [安全建议](/security)）
- **修改端口、监听或 web_path 后必须重启** `3m-ui` 服务

环境变量与 API 说明见 [NAT与面板端口](/nat-port)。

## 语言与主题

界面支持多语言（面板内可切换；登录页亦可切换语言与主题）。默认跟随浏览器或本地已保存偏好。

## 安全与备份

- **两步验证（TOTP）**：设置 / 启用 / 关闭管理员动态口令（见 [安全建议](/security)）
- 修改密码入口
- 下载备份（SQLite + Mihomo 配置 zip）、恢复数据库（恢复后需重启）

## 访问档案

公网 Host / SNI / 客户端指纹等，用于分享链接与客户端 YAML 导出。

## Telegram

见 [Telegram-Bot](/telegram-bot)。机器人语言可与面板语言独立配置（多语言告警文案）。

## 订阅页

- 主题目录、页面标题、支持链接
- 公告、Profile 网页 URL
- 刷新间隔（小时）
- 是否 Base64 编码 URI 列表
- 下载默认 HTML 模板

见 [订阅](/subscription)。

## 证书 / SSL

面板 SSL（ACME 或手动证书路径）。见 [SSL与证书](/ssl-cert)。

## GeoIP / GeoSite

一键下载 MetaCubeX 数据库到 Mihomo 数据目录，供路由规则使用。

## 流量重置

可配置每月重置日、告警阈值等。用户级「周期重置 / 到期续期」在用户编辑中配置，见 [用户与流量](/users-traffic)。

## Cloudflare WARP

一键注册 WARP WireGuard 配置，生成可粘贴到 Mihomo 的 YAML 片段（需按需并入出站/路由）。

## 模板

TLS / 反代配置片段生成，便于复制到 Nginx、Caddy 等。

## 关于

版本号与构建信息；应与当前安装的 Release 标签一致（如 `v1.1.0`）。
