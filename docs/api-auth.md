---
id: api-auth
title: API 与认证
---

## 基址

```text
http(s)://<host>:<port>/api/v1
```

健康检查（可无需登录，视版本而定）：

```text
GET /api/v1/health
```

## 登录

```http
POST /api/v1/auth/login
Content-Type: application/json

{"username":"admin","password":"..."}
```

响应中的 JWT 用于后续请求：

```http
Authorization: Bearer <token>
```

## 常用资源（需认证）

| 前缀 | 用途 |
|------|------|
| `/users` | CRUD、批量、清理耗尽、`export-links`、分组/标签/周期续期字段 |
| `/users/{id}/hwid-devices` | HWID 设备列表与删除 |
| `/users/{id}/telegram` | 绑定/解绑 Telegram |
| `/nodes` · `/listeners` | 入站管理 |
| `/access-tokens` | 按节点的访问令牌与订阅链接 |
| `/mihomo/*` | 核心启停、日志 |
| `/config/*` | 配置生成/预览/校验/应用 |
| `/system/*` | 备份、Geo、SSL、订阅页、WARP 模板与一键注册 |
| `/telegram/*` | Bot 设置、测试、setMyCommands |
| `/cluster/*` | 多机节点 |
| `/traffic` | 流量 |
| `/panel-settings` | 面板键值设置（如全局流量重置日） |

完整契约以面板内 **OpenAPI** 为准：`GET /api/v1/openapi.yaml`（文档版本 1.2）。

### 用户扩展字段（写接口）

| 字段 | 说明 |
|------|------|
| `group` | 分组名 |
| `tags` | 逗号分隔标签 |
| `traffic_reset_days` | >0 时按 N 天重置该用户流量 |
| `expire_renew_days` | >0 且已到期时再延长 N 天 |

### 一键导出订阅

```http
GET /api/v1/users/export-links?q=&group=
Authorization: Bearer <jwt>
```

### WARP 一键

```http
POST /api/v1/system/templates/warp/register
Authorization: Bearer <jwt>
```

## 公共订阅

订阅接口使用 **sub_token**，不走管理员 JWT。默认路径：

```text
GET /api/v1/client/sub/{token}
GET /api/v1/client/clash|v2ray|json/{token}
```

若配置 `server.sub_path`（如 `/sub`），另提供 `{sub_path}/{token}`；`server.sub_port` 可把订阅挂到独立端口。详见 [订阅](/subscription) 与主仓库安装文档。

## 多机远程

Cluster 代理使用本机管理员 JWT 调用本机 `/cluster`，由本机再持远程 JWT 访问远端。远程 Token 妥善保管。
