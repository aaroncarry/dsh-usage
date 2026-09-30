---
description: "安装 Desktop 侧栏的用量统计页，从会话中读取供应商报告的 Token 总量。"
kind: "package-bundle"
---

# @deepseek-ai/dsh-client-ui-usage

[English](README.md) | 中文

## 概述

将本组合包加入 Desktop profile 后，可从左侧栏打开**用量统计**。页面支持预设时间范围或自定义起止日期，提供最近一年或自然年活动热力图及日期筛选、按星期与小时的时段分布、输入 Token 与使用效率趋势、输入输出构成、模型、项目和供应商占比，以及高用量或最近聊天 Top 10 会话。图表悬停时显示精确数值。重启后页面会先显示上次保存的统计结果，同时刷新数据。统计数据来自持久化会话日志中供应商报告的用量；数据完整性面板将无法读取的会话、缺少完整用量的轮次、无法归属单一模型或供应商的轮次分开显示。通过 `dsh plugin` 安装或移除，无需改动 Desktop 应用包。

## 目录

- [使用本包](#use-this-package)
- [了解实现](#understand-the-implementation)
- [延伸阅读](#further-exploration)
- [模型体验](#model-experience)
- [已知限制与后续工作](#known-limitations-and-deferred-work)
- [开发备注](#dev-note)

-----

<a id="use-this-package"></a>
## 使用本包

### 安装到 profile

克隆本仓库，完全退出 Desktop 后使用绝对本地路径安装仓库内的构建产物，再重新打开 Desktop：

```powershell
git clone https://github.com/aaroncarry/dsh-usage.git D:\dsh-usage
dsh plugin --profile desktop add D:\dsh-usage
```

安装器把本包加入 Desktop profile，并启用其 `dsh.bundle.patch` 配置层。运行 `dsh plugin --profile desktop remove @deepseek-ai/dsh-client-ui-usage` 可移除，然后重新打开 Desktop。未声明组合包的包只会安装为依赖，不会增加统计页条目。

### 功能

配置层插入一个 `ui-usage` 条目：

```yaml
- id: ui-usage
  name: '@deepseek-ai/dsh-client-ui-usage'
```

Host 读取 Session Query 与 Workspace Registry。包的 Client 部分挂载自身生成的 Usage Remote，注册多语言文案，并贡献侧栏入口和主页面。可在插件条目的 `config` 中设置可选的 `readConcurrency`，限制同时读取的冷会话数；取值为 1 至 16 的整数，默认 4。此页只读，不作为账单或额度仪表盘。

-----

<a id="understand-the-implementation"></a>
## 了解实现

<details>
<summary>实现内部细节 — 点击展开</summary>

`cordis.patch.yml` 在 profile 原有组合包之后插入 `ui-usage` 条目。Host 以受限的并行数观察会话日志，并按本包的供应商精确用量规则折叠每个已完成轮次。它排除 fork 继承的日志前缀，使同一供应商调用只计一次。在 Host 进程内，未变化的会话根据活动序号或持久化修订号复用折叠结果；手动重新统计会绕过缓存。持久化修订号不能跨 Host 重启比较，因此重启后 Host 会再次核对可用日志。Client 将上次统计结果保存在浏览器本地存储中，核对期间立即显示旧结果，并标明数据时间与读取进度。缺少完整核算的轮次不产生数值，无法读取的会话单独报告。在结束前被新轮次取代的轮次按不完整报告；在报告任何用量之前就失败的尝试视为未计费。只有所有尝试都能归到同一供应商与模型的轮次才进入相应占比；其他精确总量列为**未归属**。轮次用量按结束时刻归入浏览器本地自然日。热力图通过 Client 共用的提示框显示每日已核实的用量，没有可核实用量的日期保持空白，也能选择一天作为页面筛选条件。最近聊天榜按最后一次聊天事件排序，显示所选时间范围内的 Token 数。

本包不发布运行时不变量伴随文件，因为折叠缓存是可丢弃的派生数据，Session Query 日志仍是用量的唯一权威来源。

</details>

-----

<a id="further-exploration"></a>
## 延伸阅读

- [Profile 组合包](https://github.com/deepseek-ai/deepseek-harness/blob/master/docs/user/develop/basic/publish.zh.md) 说明安装与配置层顺序。
- [Session Query](https://github.com/deepseek-ai/deepseek-harness/blob/master/packages/session-query/session-query/README.zh.md) 提供冷会话与活动会话读取。
- [客户端槽位](https://github.com/deepseek-ai/deepseek-harness/blob/master/docs/subsystems/slots.zh.md) 说明侧栏和主面板注册。

-----

<a id="model-experience"></a>
## 模型体验

无。插入的插件不注册面向模型的工具或消息。

#### KV Cache 影响

无。读取用量不会进入模型请求。

## 已知限制与后续工作

<a id="known-limitations-and-deferred-work"></a>

- 一个已完成轮次使用多个路由，或有尝试缺少路由时，供应商与模型占比会出现**未归属**。所选记录缺少缓存计数时，缓存命中率不可用。
- Host 重启后会核对每份可用会话日志。历史记录很大时，首次核对可能较慢；完成前，上次保存的结果可能不是最新值。会话结束、新增、移除或连接重置后会刷新。
- 可核实轮次占比不包含无法读取的会话，因为无法确定其缺少用量的轮次数量。按模型筛选时该指标不可用，因为无法可靠地为不完整轮次归属模型。所选已完成轮次缺少缓存计数时，缓存读取占比不可用。
- 项目归属将会话的工作目录匹配到包含它的最深层已注册 Workspace（忽略路径分隔符、末尾斜杠，Windows 与 macOS 上还忽略大小写），再回退到父会话关系。注册 Workspace 之外的会话列为**未归属**。

<a id="dev-note"></a>
### 开发备注

<details>
<summary>维护工作上下文 — 点击展开</summary>

无。

</details>
