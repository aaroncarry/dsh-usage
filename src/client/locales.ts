/** Copy for the desktop usage dashboard. */
export const zh = {
  panel: '用量统计', title: '用量统计', subtitle: '查看 Token 使用趋势与构成',
  period: '时间范围', project: '项目', model: '模型', allProjects: '全部项目', allModels: '全部模型',
  days7: '最近 7 天', days30: '最近 30 天', days90: '最近 90 天', days365: '最近 365 天',
  total: '累计 Token', average: '日均 Token', peak: '单日峰值', active: '活跃天数', cacheRate: '缓存命中率',
  compared: '较上一周期', retry: '重试', loading: '正在读取会话用量…', refreshing: '正在更新用量…',
  error: '读取用量失败', staleError: '更新失败，当前显示上次保存的数据', staleAsOf: '数据截至', updatedAt: '更新于', refresh: '刷新',
  heatmap: 'Token 活动', heatmapNote: '过去 365 天 · 每格一天', heatmapRange: '查看范围', rollingYear: '最近一年', oneCellDay: '每格一天', clearDay: '清除日期筛选',
  dataQuality: '数据完整性', qualityIntro: '统计总量仅包含供应商报告的完整用量。', rebuild: '重新统计全部数据',
  unreadableSessions: '无法读取的会话', unreadableExplanation: '这些会话的用量未计入总量',
  missingTurns: '缺少完整用量的轮次', missingExplanation: '这些轮次的用量未计入总量',
  unattributedTurns: '无法归属模型或供应商的轮次', unattributedExplanation: '用量已计入总量，归为未归属',
  turns: '轮次', sessionsUnit: '会话', unattributedShort: '未归属轮次',
  currentStreak: '当前连续', longestStreak: '最长连续', days: '天', less: '少', more: '多',
  trend: '用量趋势', trendNote: '总 Token · 按模型堆叠', daily: '每日', weekly: '每周', cumulative: '累计', percentagePoints: '个百分点',
  output: '输出', composition: '输入输出构成', uncached: '普通输入', cacheRead: '缓存读取', cacheWrite: '缓存写入', unknownInput: '其他输入',
  models: '模型用量占比', projects: '项目用量', providers: '供应商用量占比',
  sessions: '会话 Top 10', highUsage: '高用量', recent: '最近聊天', lastChat: '最近聊天',
  unknown: '未归属', other: '其他', noData: '所选范围暂无 Token 用量',
  tokenUnit: 'Token', openSession: '打开会话', noPrior: '上一周期无数据', cacheUnknown: '部分轮次未报告缓存',
  dailyAverage: '日均', weeklyAverage: '周均', noUsage: '无用量', legendToggle: '点击显示或隐藏',
  customRange: '自定义范围', rangeStart: '开始日期', rangeEnd: '结束日期',
  hourly: '时段分布', hourlyNote: '按星期与小时统计 Token', peakHour: '高峰时段', hourTotal: '各小时合计',
} as const

/** English fallback dictionary. */
export const en: Record<keyof typeof zh, string> = {
  panel: 'Usage', title: 'Token usage', subtitle: 'Track token trends and composition',
  period: 'Period', project: 'Project', model: 'Model', allProjects: 'All projects', allModels: 'All models',
  days7: 'Last 7 days', days30: 'Last 30 days', days90: 'Last 90 days', days365: 'Last 365 days',
  total: 'Total tokens', average: 'Daily average', peak: 'Peak day', active: 'Active days', cacheRate: 'Cache hit rate',
  compared: 'vs previous period', retry: 'Retry', loading: 'Reading session usage…', refreshing: 'Updating usage…',
  error: 'Could not load usage', staleError: 'Update failed; showing the last saved data', staleAsOf: 'Data as of', updatedAt: 'Updated', refresh: 'Refresh',
  heatmap: 'Token activity', heatmapNote: 'Past 365 days · one cell per day', heatmapRange: 'Range', rollingYear: 'Past year', oneCellDay: 'One cell per day', clearDay: 'Clear day filter',
  dataQuality: 'Data quality', qualityIntro: 'Totals include only complete provider-reported usage.', rebuild: 'Recalculate all sessions',
  unreadableSessions: 'Unreadable sessions', unreadableExplanation: 'Their usage is excluded from totals',
  missingTurns: 'Turns without complete usage', missingExplanation: 'Their usage is excluded from totals',
  unattributedTurns: 'Turns without one model or provider', unattributedExplanation: 'Their usage is included under Unattributed',
  turns: 'turns', sessionsUnit: 'sessions', unattributedShort: 'unattributed turns',
  currentStreak: 'Current streak', longestStreak: 'Longest streak', days: 'days', less: 'Less', more: 'More',
  trend: 'Usage trend', trendNote: 'Total tokens stacked by model', daily: 'Daily', weekly: 'Weekly', cumulative: 'Cumulative', percentagePoints: 'pp',
  output: 'Output', composition: 'Token composition', uncached: 'Uncached input', cacheRead: 'Cache read', cacheWrite: 'Cache write', unknownInput: 'Other input',
  models: 'Usage by model', projects: 'Usage by project', providers: 'Usage by provider',
  sessions: 'Top 10 sessions', highUsage: 'High usage', recent: 'Recent chats', lastChat: 'Last chat',
  unknown: 'Unattributed', other: 'Other', noData: 'No token usage in this period',
  tokenUnit: 'tokens', openSession: 'Open session', noPrior: 'No data in previous period', cacheUnknown: 'Some turns omit cache counts',
  dailyAverage: 'Daily avg', weeklyAverage: 'Weekly avg', noUsage: 'No usage', legendToggle: 'Click to show or hide',
  customRange: 'Custom range', rangeStart: 'Start date', rangeEnd: 'End date',
  hourly: 'Activity by hour', hourlyNote: 'Tokens by weekday and hour', peakHour: 'Peak hour', hourTotal: 'All days by hour',
}

/** Locale keys available to this plugin. */
export type UsageLocaleKey = keyof typeof zh
