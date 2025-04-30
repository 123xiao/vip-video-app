// 播放历史记录项的接口
export interface PlayHistoryItem {
  url: string;
  title?: string;
  platform?: string; // 视频平台名称
  timestamp: number; // 播放时间戳
  duration?: number; // 视频总时长(如果获取到)
  currentTime?: number; // 上次播放的位置
}

// 本地存储的键名
const PLAY_HISTORY_KEY = "vip-video-play-history";

// 视频平台列表及其URL特征
const PLATFORMS = [
  { name: "爱奇艺", patterns: ["iqiyi.com", "iqiy.com"] },
  { name: "腾讯视频", patterns: ["v.qq.com", "video.qq.com"] },
  { name: "优酷", patterns: ["youku.com"] },
  { name: "芒果TV", patterns: ["mgtv.com"] },
  { name: "哔哩哔哩", patterns: ["bilibili.com", "b23.tv"] },
  { name: "搜狐视频", patterns: ["tv.sohu.com", "sohu.com/v"] },
  { name: "1905电影网", patterns: ["1905.com"] },
  { name: "PPTV", patterns: ["pptv.com"] },
  { name: "咪咕视频", patterns: ["miguvideo.com"] },
  { name: "乐视视频", patterns: ["le.com"] },
];

// 识别URL所属平台
export function detectPlatform(url: string): string {
  if (!url) return "未知平台";

  const lowerUrl = url.toLowerCase();

  for (const platform of PLATFORMS) {
    if (platform.patterns.some((pattern) => lowerUrl.includes(pattern))) {
      return platform.name;
    }
  }

  return "其他平台";
}

// 获取播放历史
export function getPlayHistory(): PlayHistoryItem[] {
  if (typeof window === "undefined") return [];

  try {
    const historyData = localStorage.getItem(PLAY_HISTORY_KEY);
    return historyData ? JSON.parse(historyData) : [];
  } catch (error) {
    console.error("获取播放历史失败:", error);
    return [];
  }
}

// 添加或更新播放历史
export function addToPlayHistory(item: PlayHistoryItem): PlayHistoryItem[] {
  if (typeof window === "undefined") return [];

  try {
    const history = getPlayHistory();

    // 如果没有指定平台，则自动检测
    if (!item.platform) {
      item.platform = detectPlatform(item.url);
    }

    // 检查是否已存在相同URL的记录
    const existingIndex = history.findIndex((h) => h.url === item.url);

    if (existingIndex !== -1) {
      // 更新现有记录
      history[existingIndex] = {
        ...history[existingIndex],
        ...item,
        timestamp: Date.now(), // 更新时间戳
      };
    } else {
      // 添加新记录
      history.unshift({
        ...item,
        timestamp: Date.now(),
      });
    }

    // 限制历史记录数量为20条
    const limitedHistory = history.slice(0, 20);

    // 保存到本地存储
    localStorage.setItem(PLAY_HISTORY_KEY, JSON.stringify(limitedHistory));

    return limitedHistory;
  } catch (error) {
    console.error("添加播放历史失败:", error);
    return [];
  }
}

// 更新播放进度
export function updatePlayProgress(
  url: string,
  currentTime: number,
  duration?: number
): void {
  if (typeof window === "undefined") return;

  try {
    const history = getPlayHistory();
    const existingIndex = history.findIndex((h) => h.url === url);

    if (existingIndex !== -1) {
      // 更新播放进度
      history[existingIndex].currentTime = currentTime;
      if (duration) {
        history[existingIndex].duration = duration;
      }

      // 保存到本地存储
      localStorage.setItem(PLAY_HISTORY_KEY, JSON.stringify(history));
    }
  } catch (error) {
    console.error("更新播放进度失败:", error);
  }
}

// 删除单个播放历史
export function removeFromPlayHistory(url: string): PlayHistoryItem[] {
  if (typeof window === "undefined") return [];

  try {
    let history = getPlayHistory();
    history = history.filter((item) => item.url !== url);

    // 保存到本地存储
    localStorage.setItem(PLAY_HISTORY_KEY, JSON.stringify(history));

    return history;
  } catch (error) {
    console.error("删除播放历史失败:", error);
    return [];
  }
}

// 清空所有播放历史
export function clearPlayHistory(): void {
  if (typeof window === "undefined") return;

  try {
    localStorage.removeItem(PLAY_HISTORY_KEY);
  } catch (error) {
    console.error("清空播放历史失败:", error);
  }
}

// 格式化播放时间
export function formatPlayTime(seconds: number): string {
  if (!seconds) return "00:00";

  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = Math.floor(seconds % 60);

  if (hours > 0) {
    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  }

  return `${minutes.toString().padStart(2, "0")}:${secs
    .toString()
    .padStart(2, "0")}`;
}

// 格式化日期时间
export function formatDateTime(timestamp: number): string {
  const date = new Date(timestamp);
  return `${date.getFullYear()}-${(date.getMonth() + 1)
    .toString()
    .padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")} ${date
    .getHours()
    .toString()
    .padStart(2, "0")}:${date.getMinutes().toString().padStart(2, "0")}`;
}
