---
id: ssl-cert
title: 面板 SSL
---

这里说的是 **面板自己的 HTTPS**，不是节点入站证书。

系统设置里可以配 Let’s Encrypt（autocert）或手动证书路径。保存后一般要重启面板才生效。

节点 TLS / 自签见 [节点管理](/listeners)。反代终止 TLS 时，节点侧可能用 `allow-insecure` 一类选项，和面板 HTTPS 不是一回事。
