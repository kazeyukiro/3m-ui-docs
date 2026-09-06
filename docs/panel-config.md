---
id: panel-config
title: 面板配置
---

主配置文件一般是：

```text
/etc/3m-ui/config.yaml
```

常见项：监听端口、`public_url`（订阅外链用）、数据库路径、JWT / 凭据加密密钥、Mihomo 二进制与配置路径、CORS 等。

密钥用长随机串，别抄文档示例。改端口也可以：

```bash
sudo 3m-ui config port <端口>
```

更多 UI 里的开关见 [系统设置](/system-settings)。
