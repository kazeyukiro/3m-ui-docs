---
id: listeners
title: 节点管理
---

对应 Mihomo 的 inbound / listener，面板里就叫节点。

## 新建 / 编辑

协议、端口、绑定地址、启用开关，以及各协议自己的字段（UUID、密码、SNI、Reality 等）。

**Public Host / Public Port** 只影响订阅和分享里写给客户端的地址，不改本机监听。

保存后会走生成配置 → 校验 → 应用；失败会尽量回滚。

**配置引擎** 里也可以手动：生成（预览）→ 校验 → 应用，和点保存是同一条链路的不同入口。

## 协议

以面板当前版本列出的为准，常见有 VLESS、VMess、Trojan、Shadowsocks、Hysteria2、TUIC、AnyTLS 等。字段随协议变，别直接改数据库。

## TLS 自签

需要服务端证书又没填 PEM 时，面板会签一张自签（Organization 为 `3m-ui`），落到：

```text
/var/lib/3m-ui/listener-certs/{id}.crt
/var/lib/3m-ui/listener-certs/{id}.key
```

- 只更新二进制时，会尽量从这里恢复，避免无故换证
- 订阅 / URI 对面板自签会带 `skip-cert-verify` 或 `insecure=1`
- Reality 或完整 TLS 包装（shadow-tls、jls 等）不会硬塞自签
- 备份见 [备份与恢复](/backup-restore)

## 和用户的关系

用户绑定一个或多个节点后，订阅里只会带他有权限的那些。
