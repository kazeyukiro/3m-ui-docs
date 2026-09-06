---
id: verify-release-signature
title: 验证 Release 签名
---

官方包会带 `SHA256SUMS`，较新版本还有 cosign 的 `SHA256SUMS.pem` / `SHA256SUMS.sig`（keyless）。安装脚本默认会校验校验和；有 cosign 时再验签名。

## 手动核一次

```bash
TAG=v1.0.0   # 换成实际 tag
ARCH=amd64   # 按机器改

curl -fLO "https://github.com/kazeyukiro/3m-ui/releases/download/${TAG}/3m-ui-linux-${ARCH}"
curl -fLO "https://github.com/kazeyukiro/3m-ui/releases/download/${TAG}/SHA256SUMS"
curl -fLO "https://github.com/kazeyukiro/3m-ui/releases/download/${TAG}/SHA256SUMS.pem"
curl -fLO "https://github.com/kazeyukiro/3m-ui/releases/download/${TAG}/SHA256SUMS.sig"

sha256sum -c SHA256SUMS --ignore-missing

# identity 以该次 Release 构建时的 workflow ref 为准，见 release 说明
cosign verify-blob \
  --certificate SHA256SUMS.pem \
  --signature SHA256SUMS.sig \
  --certificate-identity "https://github.com/kazeyukiro/3m-ui/.github/workflows/release.yml@refs/tags/${TAG}" \
  --certificate-oidc-issuer https://token.actions.githubusercontent.com \
  SHA256SUMS
```

早期或回填签名的 tag，identity 可能是 `refs/heads/main`，以该版本 Release 正文为准。

## 安装器相关环境变量

| 变量 | 作用 |
|------|------|
| （默认） | 3m-ui 包缺校验和会失败；cosign 缺失多半警告 |
| `THREE_M_UI_INSECURE=1` | 跳过校验，**仅应急** |
| `THREE_M_UI_VERIFY_MIHOMO=1` | 连 Mihomo 下载也强制校验（依赖 GitHub API） |

Mihomo 上游不提供与我们同款的 SUMS 文件，默认校验失败只警告，因为面板包本身已经验过。

装包过程见 [安装与升级](/install)。
