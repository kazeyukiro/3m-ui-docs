---
id: security
title: 安全建议
---

- 生产用 HTTPS（面板自带 ACME 或前面挂反代都行）
- 装完立刻改掉 `admin` 默认密码；首次登录也会强制改
- JWT 密钥和凭据加密密钥分开、随机、足够长
- `cors_origins` 别写 `*`
- 订阅 token、Bot token、备份文件当机密处理
- 管理口尽量别裸奔在公网，能 VPN / 防火墙限制就限制
- 二进制校验见 [验证 Release 签名](/verify-release-signature)
