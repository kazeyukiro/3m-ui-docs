---
id: dev-channel
title: 开发通道（test）
---

本文说明 **test** 分支与 **Pre-release** 的用途。生产环境请使用 `main` 分支及正式 Release。

## 正式通道与开发通道

| 项目 | 正式（main） | 开发（test） |
|------|----------------|----------------|
| 代码分支 | [main](https://github.com/kazeyukiro/3m-ui/tree/main) | [test](https://github.com/kazeyukiro/3m-ui/tree/test) |
| 发布形态 | 正式 GitHub Release（更新 `latest`） | **Pre-release**（`prerelease: true`，不覆盖 `latest`） |
| 安装 / 升级脚本 | 跟随最新正式版本 | 优先选择最新 Pre-release |
| 适用场景 | 生产与日常使用 | 功能验证与开发联调 |

向 `test` 分支推送代码时，持续集成将自动构建并发布 Pre-release，版本标签形如 `test-<序号>-<短提交哈希>`。

## 安装 Pre-release

须使用 **test** 分支上的安装脚本；`main` 分支脚本不会默认安装预发布版本：

```bash
curl -fsSL https://raw.githubusercontent.com/kazeyukiro/3m-ui/test/scripts/install.sh | sudo bash
```

指定某一预发布标签：

```bash
curl -fsSL https://raw.githubusercontent.com/kazeyukiro/3m-ui/test/scripts/install.sh | sudo bash -s -- test-12-abcdef0
```

若本机管理入口脚本已随 test 通道安装，可执行：

```bash
sudo 3m-ui update
```

## 注意事项

1. Pre-release 可能包含未充分验证的变更，**不建议用于生产环境**。
2. 数据目录与正式版相同。在切换回正式版本前，请备份数据库与 `listener-certs/` 等目录，参见 [备份与恢复](/backup-restore)。
3. 正式环境的安装与升级步骤见 [安装与升级](/install)。
