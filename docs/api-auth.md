---
id: api-auth
title: API 与认证
---

基址：

```text
http(s)://<host>:<port>/api/v1
```

登录：

```http
POST /api/v1/auth/login
Content-Type: application/json

{"username":"admin","password":"..."}
```

之后：

```http
Authorization: Bearer <token>
```

健康检查一般是 `GET /api/v1/health`。OpenAPI 若开启：`GET /api/v1/openapi.yaml`。

管理类接口都要 JWT。用户订阅走 **sub_token**，不走管理员 JWT，见 [订阅](/subscription)。

多机相关接口在本机鉴权后，由本机再拿远程 JWT 去调远端。完整路径以 OpenAPI 或源码路由为准。
