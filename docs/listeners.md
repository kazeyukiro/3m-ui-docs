---
id: listeners
title: 节点管理 (Listeners)
---

对应 Mihomo 的 **inbound / listener**，在面板中称为节点。

## 一键创建（推荐）

**节点管理** 页主按钮为 **一键创建 / Quick create**：

1. 选择协议（默认 VLESS）
2. 填写名称（可自动建议「节点1」「节点2」…）
3. 确认

服务端会自动：

- 分配空闲端口（约 10000–60000，避开 80/443/8080 等）
- 按协议生成默认配置（VLESS / VMess / Trojan 默认 REALITY，并带可用 dest）
- 填充 UUID / 密码 / 密钥 / 证书等
- **启用** 节点并重写 Mihomo 配置

API：`POST /api/v1/nodes/quick`，请求体：

```json
{ "name": "节点1", "protocol": "vless" }
```

## 完整创建与编辑

「创建」打开完整表单，可配置：

- 名称、协议、端口、绑定地址
- 启用 / 禁用、UDP
- 协议相关字段（UUID、密码、路径、SNI、REALITY 目标等）
- TLS 证书路径或由上层反代终止 TLS
- **Public Host / Public Port / Access SNI**：客户端看到的地址（CDN、多 IP、IPv6 时很有用）

保存后走配置生成 → 校验 → 应用；失败会尝试回滚。

在 **配置引擎** 中可将「生成 / 校验 / 应用」分开：生成只预览 YAML，不会写盘。

## 名称与删除

- 名称全局唯一（含软删除历史占用时，创建前会尽量回收）
- 删除为幂等：重复删除已不存在的 id 不再报错；列表会刷新
- 若提示「名称已存在」，面板可能已自动换名重试；请刷新列表确认

## 协议

常见支持（以当前版本协议表为准）：

- VLESS / VMess / Trojan / Shadowsocks / Snell
- Hysteria2 / TUIC / AnyTLS / ShadowQUIC / Mieru / Sudoku / TrustTunnel 等

具体字段随协议变化，未知字段不要手改数据库。

## 与用户的关系

用户可绑定一个或多个 Listener；订阅与分享链接只包含其有权使用的入站。

## TLS 自签证书

需要服务端证书且未填写 PEM 时，面板会签发自签证书，并写入：

`/var/lib/3m-ui/listener-certs/{id}.crt` / `.key`

- 更新面板时尽量从该目录恢复，避免无故换证
- **Reality** 或完整 TLS 包装不会强制自签
- 备份时请包含 `listener-certs/`（见 [备份与恢复](/backup-restore)）
