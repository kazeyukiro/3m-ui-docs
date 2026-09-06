---
id: backup-restore
title: 备份与恢复
---

## 面板里下备份

**系统设置 → 安全与备份 → 下载备份**。zip 里通常有：

- `3m-ui.db` — 用户、节点、设置等
- `mihomo-config.yaml` — 当时的核心配置（有的话）
- `backup-meta.txt` — 一点元信息

## 证书目录也要备

自签证书在：

```text
/var/lib/3m-ui/listener-certs/
```

只恢复数据库、不恢复这个目录，节点可能重新签证书，客户端得重新拉订阅（即便开了 skip 也能连，身份已经变了）。

整包冷备示例：

```bash
tar czf 3m-ui-full-$(date +%F).tgz \
  /var/lib/3m-ui/3m-ui.db \
  /var/lib/3m-ui/listener-certs \
  /etc/3m-ui/config.yaml \
  /var/lib/3m-ui/mihomo
```

## 恢复

同一页上传 zip 或裸 `.db`。恢复完**一定要重启**：

```bash
sudo 3m-ui restart
```

不重启的话，进程可能还握着旧文件。上传体积上限看当前版本（常见 128MB 左右）。

## API

```bash
curl -H "Authorization: Bearer <token>" \
  -o 3m-ui-backup.zip \
  https://panel.example.com/api/v1/system/backup

curl -X POST -H "Authorization: Bearer <token>" \
  -F "database=@3m-ui-backup.zip" \
  https://panel.example.com/api/v1/system/backup/restore-db
```
