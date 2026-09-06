---
id: install
title: 安装与升级
---

## 环境

- Linux（glibc 或 Alpine musl 都行）
- root
- 能访问 GitHub Release（下二进制）

不用预装 Go、Node，也不依赖系统 `libsqlite3`。官方包是纯静态 Go。

## 一键安装

```bash
curl -fsSL https://raw.githubusercontent.com/kazeyukiro/3m-ui/main/scripts/install.sh | bash
```

换端口：

```bash
PANEL_PORT=8443 curl -fsSL https://raw.githubusercontent.com/kazeyukiro/3m-ui/main/scripts/install.sh | bash
```

自动化场景可设 `THREE_M_UI_NONINTERACTIVE=1`，结果写在 `/etc/3m-ui/install-result.env`（默认账号不变）。

装完：

```text
面板    http://服务器IP:8080/
账号    admin
密码    admin    ← 登录后马上改
命令    sudo 3m-ui
```

## 改端口

```bash
sudo 3m-ui config port 9000
```

或跑 `sudo 3m-ui` 进菜单改。面板「系统设置」里改端口后要自己重启服务：

```bash
sudo 3m-ui restart
```

NAT / 多端口细节见 [NAT 与端口](/nat-port)。

## 升级

```bash
sudo 3m-ui update
# 指定版本：
sudo 3m-ui update v1.0.0
```

若提示「未知命令: update」，说明入口脚本还是旧的，先：

```bash
curl -fsSL https://raw.githubusercontent.com/kazeyukiro/3m-ui/main/scripts/update.sh | sudo bash
```

升级会备份（默认留最近几份），新版本起不来会尽量回滚。

想试未正式发布的功能，见 [开发通道](/dev-channel)。

## 常用命令

```bash
sudo 3m-ui status|start|restart|stop|logs|version
sudo 3m-ui config show
sudo 3m-ui config port <端口>
sudo 3m-ui install      # 重装/修复
sudo 3m-ui uninstall
sudo 3m-ui help
```

不带参数就是交互菜单。

## 卸载

```bash
sudo 3m-ui uninstall
```

要连数据一起删，看 `uninstall.sh --help` 里的 purge 选项。

## 目录

| 路径 | 干啥的 |
|------|--------|
| `/usr/local/bin/3m-ui` | 管理命令 |
| `/usr/local/lib/3m-ui/` | 面板二进制和脚本 |
| `/etc/3m-ui/config.yaml` | 面板配置 |
| `/var/lib/3m-ui/3m-ui.db` | 数据库 |
| `/var/lib/3m-ui/listener-certs/` | 节点自签证书（备份别漏） |
| `/var/lib/3m-ui/mihomo/` | Mihomo 数据和配置 |
| `/var/log/3m-ui/` | 日志 |

## Docker

仓库里有 `docker-compose.yml`，按注释挂卷即可。注意容器用户对数据目录要有写权限。
