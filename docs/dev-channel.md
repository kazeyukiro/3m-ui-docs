---
id: dev-channel
title: 测试通道（Pre-release）
---

本文说明 **滚动 Pre-release**（固定标签 `pre`）的用途与安装方式。生产环境请使用正式 Release（`v*` 标签，例如 `v1.0.1`）。

## 正式版与测试版

| 项目 | 正式版 | 测试版 |
|------|--------|--------|
| 发布方式 | 推送 `v*` 标签，或由 Release 工作流发布 | GitHub Actions 手动运行 **Pre-release · rolling (pre)** |
| 标签 | `v1.0.1` 等 | 固定 `pre`（每次覆盖同一 Pre-release） |
| `latest` | 会更新 | 不会覆盖 `latest` |
| 适用场景 | 生产与日常使用 | 功能验证 |

`test` 代码分支已弃用；预发布仅通过上述 Actions 从 `main` 构建。

## 安装 / 切换到测试版

使用 `main` 上的脚本，并指定测试通道：

```bash
curl -fsSL https://raw.githubusercontent.com/kazeyukiro/3m-ui/main/scripts/install.sh | sudo bash -s -- --pre
```

已安装时：

```bash
3m-ui channel pre
# 或
3m-ui update --pre
```

## 切回正式版

```bash
3m-ui channel stable
# 或
3m-ui update --stable
# 或指定版本
3m-ui update v1.0.1
```

当前通道保存在 `/usr/local/lib/3m-ui/CHANNEL`。

## 维护者：发布 Pre-release

1. 打开仓库 **Actions** → **Pre-release · rolling (pre)**
2. **Run workflow**（可选填写说明）
3. 成功后，资产位于 [Releases](https://github.com/kazeyukiro/3m-ui/releases) 中标签为 `pre` 的 Pre-release

## 说明

- 测试版可能包含未充分验证的功能，请勿默认用于生产。
- 正式版与测试版可随时通过通道参数互相切换，无需重装系统依赖。
