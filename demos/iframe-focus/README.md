## iframe 的聚焦问题

# 问题

safari 中 activeElement 已经是 iframe, 但是 keyboard 事件依然外部的 document 获取

## 方案

使用一个隐藏的 input 来获取焦点

ps: 需要起一个本地的静态服务, 避免 iframe 的跨域问题, 比如 vscode 的 live server
