---
id: security
title: 安全建议
---

## 密钥管理

1. **JWT Secret** 与 **Credential Key** 必须使用独立、随机、至少 32 字节的值。安装脚本会自动生成；手动部署时用 `openssl rand -hex 32` 生成。
2. 密钥泄露后立即轮换。轮换 JWT Secret 会使所有已签发的 token 失效（用户需重新登录）；轮换 Credential Key 会导致已加密存储的用户密码无法解密，需重新设置。
3. `config.yaml` 文件权限应为 `0600`（安装脚本自动设置）。数据库文件权限 `0600`，目录 `0700`。

## 管理员密码

4. 初始管理员为 `admin / admin`，首次登录**强制修改密码**（`MustChangePassword`）。仅 `/auth/password` 和 `/auth/me` 接口在未改密前可访问。
5. 改密接口有速率限制（3 次 / 15 分钟 / IP），防止暴力枚举 `current_password`。
6. 密码修改后 `SessionVersion` 递增，所有已签发的 JWT 立即失效。

## 暴露面

7. 面板端口默认不对公网裸奔。Docker 部署默认绑定 `127.0.0.1:8080`，需通过反向代理（nginx/Caddy）暴露。
8. 仅开放 443 到反代；面板端口不对公网开放。
9. HTTPS：面板与订阅全程 TLS。支持 Let's Encrypt 自动证书（ACME）或手动证书。

## 订阅与 Token

10. 订阅 Token 等同于密码；用户离职即删号或轮换 token。
11. Access Token（192 位随机）有过期时间，绑定到特定 Listener。
12. Token 泄露后立即禁用或删除。

## 已知限制

以下限制已通过代码注释文档化，不影响正常使用但操作时需注意：

### 凭据加密密钥不可热轮换

更换 `security.credential_key` 后，已加密存储的代理用户密码无法解密。需在更换前导出用户列表，更换后重新设置密码。安装脚本首次生成的密钥不需要更换。

### 数据库恢复需重启

通过面板恢复数据库后，运行中的进程仍持有旧的 SQLite 句柄。**必须执行 `systemctl restart 3m-ui`** 才能让恢复的数据生效。面板会返回 `restart_required: true` 并在日志中打印 `[WARNING]`。

### HTTP-01 挑战 goroutine

启用 SSL 但 TLS 绑定失败时，HTTP-01 挑战监听器（`:80`）会作为 goroutine 继续运行，直到进程退出。这是 ACME 协议的设计需要，不影响功能。

### 全局配置线程安全

`config.GlobalConfig` 指针赋值是原子的，但字段修改没有加锁。仅管理员 API 会修改（非热路径），实际不影响。Telegram bot 在下次循环时会重新加载设置。

### Cron 调度语法

Telegram 报告调度器支持：`@hourly`、`@daily`、`@weekly`、`@monthly`、`@every <duration>`、5 字段 cron（含 `*`、逗号列表、`*/N` 步进、`A-B` 范围）。不支持 `@reboot`。

## 报告漏洞

请通过 GitHub Security Advisory 或仓库 Issues（勿公开 0-day 细节）联系维护者。
