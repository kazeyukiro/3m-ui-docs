---
id: dev-channel
title: 开发通道（test）
---

正式环境请用 **main** 和正式 Release。下面说的是给开发、试新功能用的 **test** 分支。

## 和正式版差在哪

| | 正式（main） | 开发（test） |
|--|--|--|
| 代码 | [main](https://github.com/kazeyukiro/3m-ui/tree/main) | [test](https://github.com/kazeyukiro/3m-ui/tree/test) |
| Release | 普通 Release，会更新 GitHub `latest` | **Pre-release**，不抢 `latest` |
| 装/更脚本 | 跟最新正式版 | 优先最新 Pre-release |
| 稳定性 | 发版前会压一轮 | 可能随时炸，别上生产 |

推送到 `test` 时，Actions 会打类似 `test-<序号>-<短 sha>` 的预发布包。

## 怎么装预发布

脚本必须从 **test 分支** 拉，main 上的脚本不会去装 Pre-release：

```bash
curl -fsSL https://raw.githubusercontent.com/kazeyukiro/3m-ui/test/scripts/install.sh | sudo bash
```

指定某一个预发布 tag：

```bash
curl -fsSL https://raw.githubusercontent.com/kazeyukiro/3m-ui/test/scripts/install.sh | sudo bash -s -- test-12-abcdef0
```

装过之后，如果入口脚本也是 test 通道带下来的，直接：

```bash
sudo 3m-ui update
```

## 注意

- 数据目录和正式版一样（`/var/lib/3m-ui` 等）。切回正式版前先备份，尤其是 `3m-ui.db` 和 `listener-certs/`。
- 预发布坏了，用 [安装与升级](/install) 里的正式脚本重装/降级即可。
