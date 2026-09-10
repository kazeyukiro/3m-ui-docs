---
id: subscription
title: 订阅
---

订阅是一个 URL，客户端定期拉取即可同步节点与流量信息。

## URL 形式

主路径（推荐）：

```text
/api/v1/client/sub/<sub_token>
```

按格式分流：

```text
/api/v1/client/v2ray/<sub_token>   # Base64 / 明文 URI 列表
/api/v1/client/clash/<sub_token>   # Clash / Mihomo YAML
/api/v1/client/json/<sub_token>    # Sing-box JSON
```

兼容遗留短路径：`/sub/<token>`、`/clash/<token>`、`/json/<token>`。

也可用查询参数：

```text
?target=mihomo|clash|v2ray|singbox
?html=1          # 强制 HTML 信息页
?format=info     # JSON 元数据
?encrypt=0|1     # V2Ray 列表是否 Base64
```

## 客户端自动识别

未指定 `target` 时，会根据 `User-Agent` 猜测（Clash / Sing-box / v2rayNG 等）。

## 响应头

| 头 | 含义 |
|----|------|
| `Subscription-Userinfo` | upload / download / total / expire |
| `Profile-Update-Interval` | 建议刷新小时数 |
| `Profile-Title` | 标题（常为 base64:…） |
| `Support-Url` | 支持链接 |
| `Announce` | 公告 |
| `Profile-Web-Page-Url` | 信息页 URL |

以上可在 **系统设置 → 订阅页** 中配置默认标题、支持链接、公告、网页 URL、刷新间隔、是否 Base64 加密 URI 列表。

## HTML 订阅页

浏览器以 `Accept: text/html` 访问，或在订阅 URL 后附加 `?html=1` 时，返回订阅信息页（账号状态、流量、导入链接与二维码等）。

### 面板内配置

在 **系统设置 → 订阅页** 中可配置：

| 项 | 说明 |
|----|------|
| 标题 | 信息页标题（并影响 Profile-Title） |
| 支持链接 | Support-Url |
| 公告 | 展示在信息页顶部，并写入 Announce 头 |
| 主题目录 | 自定义 HTML 模板所在目录（见下） |
| 刷新间隔 | Profile-Update-Interval（小时） |
| Base64 编码 | V2Ray 列表是否默认 Base64 |

设置页可下载**默认模板**作为起点。

### 自定义 HTML 模板

1. 在服务器上创建主题目录，且必须位于下列路径之一（防止路径穿越）：
   - `/var/lib/3m-ui/themes/<名称>/`
   - `/etc/3m-ui/themes/<名称>/`
   - `/usr/local/share/3m-ui/themes/<名称>/`
2. 在目录中放置 `index.html` 或 `sub.html`（标准 Go `html/template` 语法）。
3. 在系统设置中将「主题目录」填为该**绝对路径**并保存。
4. 留空主题目录则使用内置默认页。

模板可用字段（`ViewModel`）包括：

| 字段 | 含义 |
|------|------|
| `.Username` / `.Remark` | 用户名、备注 |
| `.Enabled` / `.IsOnline` | 是否启用、是否在线 |
| `.TrafficUsedH` / `.TrafficLimitH` | 人类可读流量 |
| `.TrafficUsed` / `.TrafficLimit` 等 | 原始字节数 |
| `.ExpireTime` | 到期时间（RFC3339 或空） |
| `.IPLimit` | IP 限制（0 表示不限制） |
| `.SubURL` | 默认订阅 URL（YAML） |
| `.SubV2RayURL` / `.SubJSONURL` / `.SubClashURL` | 各格式链接 |
| `.SubTitle` / `.SubSupportURL` / `.Announce` | 品牌与公告 |
| `.SubQRDataURI` | 订阅 URL 的 PNG 二维码（`data:image/png;base64,...`，**进程内生成，不请求外部 API**） |
| `.Links` | 节点分享 URI 字符串列表 |

示例：

```html
<img src="{{.SubQRDataURI}}" alt="qr" width="180" height="180"/>
<a href="{{.SubURL}}">Clash / Mihomo</a>
```

修改模板文件后一般立即生效（下次请求订阅页时重新加载）。

## 安全提示

- `sub_token` 等同于密码，勿提交到公开仓库
- 生产环境务必 HTTPS
- 用户禁用/到期/超流量后订阅应失败，属预期行为


## 独立路径与端口

可在 `/etc/3m-ui/config.yaml` 设置 `server.sub_path`、`server.sub_port`（及环境变量 `THREE_M_UI_SUB_PATH` / `THREE_M_UI_SUB_PORT`）。生成链接走 `public_url` + 配置的路径前缀；原有 `/api/v1/client/sub/{token}` 始终可用。
