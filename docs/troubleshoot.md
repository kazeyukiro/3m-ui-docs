---
id: troubleshoot
title: 故障排查
---

## 面板无法启动

### 端口被占用

```bash
lsof -i :8080
# 或
ss -tlnp | grep 8080
```

解决：释放端口或修改面板端口：

```bash
3m-ui config port 9000
```

### 配置文件无效

检查 `/etc/3m-ui/config.yaml`：

```bash
cat /etc/3m-ui/config.yaml
```

JWT Secret 和 Credential Key 必须是 32+ 字节的随机值。如果使用了占位符 `CHANGE_ME_TO_RANDOM_32_PLUS_BYTES` 或默认值，面板会拒绝启动。

生成新密钥：

```bash
openssl rand -hex 32
```

### 数据库恢复后无法启动

恢复备份后必须重启面板：

```bash
systemctl restart 3m-ui
```

如果恢复的是损坏的数据库文件，删除后重新恢复：

```bash
systemctl stop 3m-ui
rm /var/lib/3m-ui/3m-ui.db
# 重新上传备份恢复
systemctl start 3m-ui
```

## Mihomo 核心问题

### 核心无法启动

```bash
3m-ui logs  # 查看面板日志
journalctl -u 3m-ui -n 50  # 查看系统日志
```

常见原因：
- 配置文件语法错误（面板会自动回滚到上一个有效配置）
- 端口冲突（检查 listener 端口是否被占用）
- 二进制路径不正确（检查 `config.yaml` 中的 `mihomo.binary`）
- Mihomo 二进制缺少执行权限

### 核心崩溃

面板会自动检测核心崩溃并通过 Telegram 通知（如已启用 `crash` 事件）。自动重启会在配置验证通过后尝试。

### 流量数据不更新

检查 Mihomo external-controller 是否正常：

```bash
curl -H "Authorization: Bearer <secret>" http://127.0.0.1:9090/connections
```

如果返回空或错误，核心可能未正常运行。

## Telegram Bot 问题

### Bot 不响应

1. 检查 Token 是否正确（在面板「系统设置 → Telegram 通知」中重新输入）
2. 检查 Bot 是否被禁用
3. 查看 `journalctl -u 3m-ui` 中是否有 `telegram: getUpdates` 错误
4. 401 错误表示 Token 无效，Bot 会每 5 分钟重试一次

### Bot 命令菜单不显示

点击面板中的「注册命令菜单」按钮，或调用：

```bash
curl -X POST -H "Authorization: Bearer <token>" \
  https://panel.example.com/api/v1/telegram/set-my-commands
```

## 订阅问题

### 订阅链接返回 404

Token 可能已轮换。在「用户管理」中重新获取订阅链接。

### 订阅内容为空

检查用户是否绑定了至少一个启用的 Listener。在「用户管理 → 绑定节点」中确认。

## 集群问题

### 远程操作返回 401

集群的 `api_token` 必须是远程面板签发的 JWT（不是 Access Token）。获取方式：

```bash
curl -X POST https://remote-panel.com/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"<password>"}'
```

返回的 `token` 字段即为 JWT，填入集群设置的 `api_token`。

### 远程健康检查超时

多个远程服务器会**并行**健康检查。如果某个服务器网络不稳定，可能需要增加超时时间或检查网络连接。
