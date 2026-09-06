---
id: listeners
title: 节点管理 (Listeners)
---

对应 Mihomo 的 **inbound / listener**，在面板中称为节点。

## 创建与编辑

**节点管理** 中可配置：

- 名称、协议、端口、绑定地址
- 启用 / 禁用
- 协议相关字段（UUID、密码、路径、SNI、REALITY 等）
- TLS 证书路径或由上层反代终止 TLS
- **Public Host / Public Port**：客户端看到的地址（CDN、多 IP、IPv6 时很有用）

保存后走配置生成 → 校验 → 应用；失败会尝试回滚，避免写坏核心配置。

在 **配置引擎** 中可将「生成 / 校验 / 应用」分开操作：生成只预览 YAML，不会写盘；确认后再应用。误操作可用回滚恢复上一份配置。

## 协议

常见支持（以当前版本协议表为准）：

- VLESS / VMess / Trojan / Shadowsocks
- Hysteria2 / TUIC / 其它面板列出的类型

具体字段随协议变化，未知字段不要手改数据库。

## 搜索与批量

列表支持按名称、协议、端口、绑定地址搜索（若版本已启用）。

## 与用户的关系

用户可绑定一个或多个 Listener；订阅与分享链接只包含其有权使用的入站。

## 配置引擎

**配置** 页面可预览生成的 Mihomo YAML、做可视化或高级编辑。生产环境建议以面板表单为主，减少手工改 YAML 导致的不一致。

## TLS 自签证书

需要服务端证书且未填写 PEM 时，面板会签发自签证书（标记 Organization=`3m-ui`），并写入：

`/var/lib/3m-ui/listener-certs/{id}.crt` / `.key`

- 更新面板二进制时，会尽量从该目录恢复，避免无故换证
- 客户端订阅/URI 对面板自签会带上 `skip-cert-verify` / `insecure=1`
- **Reality** 或完整 TLS 包装（shadow-tls / jls 等）不会强制自签
- 备份时请包含 `listener-certs/`（见 [备份与恢复](/backup-restore)）
