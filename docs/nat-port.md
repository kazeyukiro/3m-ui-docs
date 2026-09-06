---
id: nat-port
title: NAT 与端口
---

面板默认 8080。NAT 或只映射了部分端口时：

**安装时指定：**

```bash
PANEL_PORT=8443 curl -fsSL https://raw.githubusercontent.com/kazeyukiro/3m-ui/main/scripts/install.sh | bash
```

**装好以后：**

```bash
sudo 3m-ui config port 8443
```

节点端口和面板端口是两回事：面板只是管理口；入站端口在节点里单独配，防火墙/安全组都要放行。

`public_url` 填用户浏览器和客户端能访问到的面板根地址（带协议和端口），订阅链接才不会指到内网 IP。
