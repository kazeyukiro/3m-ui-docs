---
id: troubleshoot
title: 排障
---

## 面板起不来

```bash
sudo 3m-ui status
sudo 3m-ui logs
# systemd：
journalctl -u 3m-ui -n 100 --no-pager
ss -lntp | grep -E '8080|你的端口'
```

若进程被 `SIGSYS` 之类信号杀掉，多半是旧版 systemd 单元太严，用当前 `update.sh` / `install.sh` 修一下单元再启。

## 更新后打不开

1. 看服务是否在跑、端口是否在听  
2. 确认不是浏览器缓存到旧前端  
3. 用正式脚本再更新一次，或装指定版本 tag  

## 节点校验失败

把 Mihomo 报的那一行读完：常见是缺证书、Reality 和证书混用、重名 listener、半截 wrapper。在节点编辑里改完再保存，或到配置引擎里校验。

## 订阅能下、连不上

对照 Public Host、端口、防火墙；自签是否带了 skip；核心是否真在跑。单节点 URI 和订阅里同一节点是否一致。

## API 调试

```bash
curl -sS -X POST http://127.0.0.1:8080/api/v1/auth/login \
  -H 'Content-Type: application/json' \
  -d '{"username":"admin","password":"<密码>"}'
```

更多签名校验问题见 [验证 Release 签名](/verify-release-signature)。
