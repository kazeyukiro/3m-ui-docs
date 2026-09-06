---
id: telegram-bot
title: Telegram
---

## 启用

1. BotFather 建 Bot，拿 token  
2. 把 Bot 拉进群或私聊，查 chat id  
3. 系统设置 → Telegram：填 token 和 chat id（可多个）  
4. 保存后点测试；私聊里发 `/start` 看菜单是否出来  

token 或 chat id 缺一个，Bot 不会真正跑起来。

## 能干什么

常见能力（以当前版本开关为准）：流量/到期提醒、CPU 告警、简单用户查询、按计划发摘要等。事件类通知可以在设置里勾选。

命令菜单可在设置里「注册命令」。语言、代理、自定义 API 地址也有对应项。

## 排障

- 没反应：先看 token、chat id、出站是否能连 Telegram  
- 有日志：面板日志里搜 `telegram`  
- 不要把 Bot token 写进公开仓库或截图
