---
id: dev-channel
title: 测试通道（Pre-release）
---

本文说明 **滚动 Pre-release**（固定标签 `pre`）的用途与安装方式。生产环境请使用正式 Release（`v*` 标签，例如 `v1.1.3`）。

## 正式版与测试版

| 项目 | 正式版 | 测试版 |
|------|--------|--------|
| 发布方式 | 推送 `v*` 标签 | Actions 滚动 **Pre-release** |
| 标签 | `v1.1.3` 等 | 固定 `pre`（每次覆盖） |
| `latest` | 会更新 | 不指向 pre |

## 切换到测试通道

```bash
# 推荐（管理脚本）
sudo 3m-ui channel pre --update

# 或分步
sudo 3m-ui channel pre
sudo 3m-ui update

# 环境变量（兼容旧写法）
sudo THREE_M_UI_CHANNEL=pre 3m-ui update
```

## 回到正式通道

```bash
sudo 3m-ui channel stable
sudo 3m-ui update
# 或指定版本
sudo 3m-ui update v1.1.3
```

当前通道保存在 `/usr/local/lib/3m-ui/CHANNEL`。查看：`sudo 3m-ui channel`。

## 维护者：发布 Pre-release

1. 打开仓库 **Actions** → **Pre-release · rolling (pre)**
2. **Run workflow**
3. 资产位于 [Releases](https://github.com/kazeyukiro/3m-ui/releases) 中标签为 `pre` 的 Pre-release

## 说明

- 测试版可能含未充分验证功能，勿默认用于生产。
- 正式版与测试版可随时切换，无需重装系统依赖。
