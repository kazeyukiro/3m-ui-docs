---
id: install
title: 安装与升级
---

## 环境要求

- Linux（glibc 或 musl / Alpine 均可）
- root 权限
- 出站网络

不需要预装 Go、Node、系统 libsqlite3。官方二进制为纯 Go 静态构建。

## 一键安装

```bash
curl -fsSL https://raw.githubusercontent.com/kazeyukiro/3m-ui/main/scripts/install.sh | bash
```

自定义端口：

```bash
PANEL_PORT=8443 curl -fsSL https://raw.githubusercontent.com/kazeyukiro/3m-ui/main/scripts/install.sh | bash
```

## 安装后

初始管理员：`admin / admin`，首次登录**强制修改密码**。

## 端口管理

安装后可通过多种方式修改面板端口：

### 方式 1：命令行（推荐）

```bash
3m-ui config port 9000
```

自动修改 `config.yaml` 并重启服务，一步到位。

### 方式 2：交互菜单

```bash
3m-ui
```

选择 `9. 修改面板端口`，输入新端口。

### 方式 3：面板 UI

在「系统设置 → 面板/NAT」修改端口并保存。修改后需手动重启：

```bash
systemctl restart 3m-ui
```

面板会弹出醒目提示告知需要重启。

### 方式 4：环境变量

```bash
PANEL_PORT=9000 curl ... | bash  # 安装时指定
```

或修改 systemd 服务的 `Environment` 行。

## 升级

```bash
3m-ui 2  # 交互菜单选择更新
```

或：

```bash
curl -fsSL https://raw.githubusercontent.com/kazeyukiro/3m-ui/main/scripts/update.sh | bash
```

升级前自动备份（保留最近 5 份），新版本启动失败自动回滚。

## 服务管理

```bash
3m-ui status    # 查看状态
3m-ui start     # 启动
3m-ui restart   # 重启
3m-ui stop      # 停止
3m-ui logs      # 查看日志
3m-ui version   # 查看版本
3m-ui config show              # 查看配置
3m-ui config port <端口号>      # 修改端口并重启
```

## 卸载

```bash
3m-ui 9  # 选择卸载（交互菜单选 a）
```

或：

```bash
curl -fsSL https://raw.githubusercontent.com/kazeyukiro/3m-ui/main/scripts/uninstall.sh | bash
```

`--purge` 同时删除数据：

```bash
curl -fsSL ... | bash -s -- --purge --yes
```

## 安装布局

| 路径 | 用途 |
|------|------|
| `/usr/local/bin/3m-ui` | 命令入口 |
| `/usr/local/lib/3m-ui/` | 二进制 + 管理脚本 |
| `/etc/3m-ui/config.yaml` | 面板配置（权限 0600） |
| `/var/lib/3m-ui/` | 数据库、Mihomo 数据 |
| `/var/log/3m-ui/` | 日志 |
| systemd 单元 | `3m-ui.service` |

## Docker

```bash
docker compose up -d
```

默认绑定 `127.0.0.1:8080`，需通过反向代理暴露。详见 [Docker 文档](https://github.com/kazeyukiro/3m-ui)。

容器以非 root 用户（UID 10001）运行。挂载卷需确保该 UID 可读写：

```bash
sudo chown -R 10001:10001 /etc/3m-ui /var/lib/3m-ui /var/log/3m-ui
```
