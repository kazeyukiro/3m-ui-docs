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

非交互（如 cloud-init）可设置 `THREE_M_UI_NONINTERACTIVE=1`；安装结果会写入 `/etc/3m-ui/install-result.env`（默认账号策略不变）。

## 安装后

初始管理员：`admin / admin`，首次登录**强制修改密码**。

管理入口：

```bash
sudo 3m-ui          # 交互菜单
sudo 3m-ui help     # 子命令列表
```

## 端口管理

### 方式 1：命令行（推荐）

```bash
sudo 3m-ui config port 9000
```

自动修改 `config.yaml` 并重启服务。

### 方式 2：交互菜单

```bash
sudo 3m-ui
```

选择「修改面板端口」。

### 方式 3：面板 UI

在「系统设置 → 面板 / 外观」修改端口并保存后，需重启服务：

```bash
sudo 3m-ui restart
# 或 systemctl restart 3m-ui
```

### 方式 4：安装时环境变量

```bash
PANEL_PORT=9000 curl -fsSL https://raw.githubusercontent.com/kazeyukiro/3m-ui/main/scripts/install.sh | bash
```

## 升级

**推荐**（v1.0.0 起入口脚本已支持）：

```bash
sudo 3m-ui update
# 指定版本：
sudo 3m-ui update v1.0.0
```

若本机仍是旧入口脚本（`未知命令: update`），可先用：

```bash
curl -fsSL https://raw.githubusercontent.com/kazeyukiro/3m-ui/main/scripts/update.sh | sudo bash
```

之后即可使用 `sudo 3m-ui update`。

也可在交互菜单中选择「更新 3m-ui」。

升级前会自动备份（默认保留最近 5 份）；新版本启动失败会尝试回滚。


## 开发通道

功能验证与预发布安装见 [开发通道（test）](/dev-channel)。


## 服务管理

```bash
sudo 3m-ui status
sudo 3m-ui start
sudo 3m-ui restart
sudo 3m-ui stop
sudo 3m-ui logs
sudo 3m-ui version
sudo 3m-ui config show
sudo 3m-ui config port <端口>
sudo 3m-ui install      # 安装 / 修复
sudo 3m-ui uninstall    # 卸载
```

## 卸载

```bash
sudo 3m-ui uninstall
# 或交互菜单选择「卸载」
```

彻底清理数据请使用官方 `uninstall.sh` 的 purge 选项（见脚本 `--help`）。

## 安装布局

| 路径 | 用途 |
|------|------|
| `/usr/local/bin/3m-ui` | 命令入口 |
| `/usr/local/lib/3m-ui/` | 面板二进制 + 管理脚本 |
| `/etc/3m-ui/config.yaml` | 面板配置（权限 0600） |
| `/var/lib/3m-ui/3m-ui.db` | SQLite 数据库 |
| `/var/lib/3m-ui/listener-certs/` | 节点自签证书（**请与数据库一并备份**） |
| `/var/lib/3m-ui/mihomo/` | Mihomo 数据与配置 |
| `/var/log/3m-ui/` | 日志 |
| systemd / OpenRC | `3m-ui` 服务 |

## Docker

```bash
docker compose up -d
```

默认绑定与卷权限以主仓库 `docker-compose.yml` 为准。挂载目录需保证容器运行用户可读写。
