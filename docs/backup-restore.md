---
id: backup-restore
title: 备份与恢复
---

## 下载备份

在「系统设置 → 安全与备份」点击「下载备份」。系统生成一个 `.zip` 文件，通常包含：

| 文件 | 说明 |
|------|------|
| `3m-ui.db` | SQLite（用户、节点、流量、设置等） |
| `mihomo-config.yaml` | 当前 Mihomo 配置快照（若已纳入备份） |
| `backup-meta.txt` | 备份元信息 |

## 必须额外备份的目录

面板自签 TLS 材料默认落在：

```text
/var/lib/3m-ui/listener-certs/
```

**请与数据库一并备份。** 仅恢复 `.db` 而丢失该目录时，节点可能重新签发证书，客户端需重新拉取订阅（`skip-cert-verify` 虽可连通，身份已变）。

建议冷备：

```bash
tar czf 3m-ui-full-$(date +%F).tgz \
  /var/lib/3m-ui/3m-ui.db \
  /var/lib/3m-ui/listener-certs \
  /etc/3m-ui/config.yaml \
  /var/lib/3m-ui/mihomo
```

## 恢复数据库

在「系统设置 → 安全与备份」上传之前的 `.zip` 或裸 `.db`。

### 支持的格式

- **ZIP**（面板下载的备份）— 解压提取 `3m-ui.db`
- **裸 SQLite `.db`** — 直接使用

### 恢复后必须重启

```bash
sudo 3m-ui restart
# 或: systemctl restart 3m-ui
```

否则进程可能仍使用旧文件句柄。恢复接口可能返回 `restart_required: true`。

### 大小限制

上传大小上限以当前版本为准（常见为 128 MiB）。

## API

```bash
# 下载备份
curl -H "Authorization: Bearer <token>" \
  https://panel.example.com/api/v1/system/backup \
  -o 3m-ui-backup.zip

# 恢复数据库
curl -X POST -H "Authorization: Bearer <token>" \
  -F "database=@3m-ui-backup.zip" \
  https://panel.example.com/api/v1/system/backup/restore-db
```
