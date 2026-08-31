---
id: backup-restore
title: 备份与恢复
---

## 下载备份

在「系统设置 → 备份与恢复」点击「下载备份」。系统生成一个 `.zip` 文件，包含：

| 文件 | 说明 |
|------|------|
| `3m-ui.db` | SQLite 数据库（用户、节点、流量、设置） |
| `mihomo-config.yaml` | Mihomo 核心配置 |
| `backup-meta.txt` | 备份元信息（创建时间） |

## 恢复数据库

在「系统设置 → 备份与恢复」上传之前下载的 `.zip` 文件或裸 `.db` 文件。

### 支持的格式

系统自动识别上传文件的格式：

- **ZIP 压缩包**（从面板下载的备份）— 自动解压提取 `3m-ui.db`
- **裸 SQLite 文件**（手动复制的 `.db`）— 直接使用

### ⚠️ 恢复后必须重启

恢复后**必须重启面板进程**，否则运行中的进程仍写入旧文件句柄，数据会丢失：

```bash
systemctl restart 3m-ui
```

面板会在恢复成功后返回 `restart_required: true`，并在日志中打印 `[WARNING]`。

### 大小限制

上传文件最大 128 MiB。超出会被拒绝。

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
