"use client";

interface PlatformLink {
  name: string;
  url: string;
  icon: string;
}

const platforms: PlatformLink[] = [
  {
    name: "爱奇艺",
    url: "https://www.iqiyi.com/",
    icon: "🏆",
  },
  {
    name: "腾讯视频",
    url: "https://v.qq.com/",
    icon: "🎬",
  },
  {
    name: "优酷",
    url: "https://www.youku.com/",
    icon: "🎯",
  },
  {
    name: "芒果TV",
    url: "https://www.mgtv.com/",
    icon: "🥭",
  },
  {
    name: "搜狐视频",
    url: "https://tv.sohu.com/",
    icon: "📺",
  },
  {
    name: "PPTV",
    url: "https://www.pptv.com/",
    icon: "📡",
  },
  {
    name: "乐视视频",
    url: "https://www.le.com/",
    icon: "🎮",
  },
  {
    name: "哔哩哔哩",
    url: "https://www.bilibili.com/",
    icon: "💫",
  },
];

export default function PlatformLinks() {
  return (
    <div className="w-full max-w-4xl mx-auto mt-12 mb-8">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-6">
        热门视频平台
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {platforms.map((platform) => (
          <a
            key={platform.name}
            href={platform.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:shadow-md hover:border-blue-300 dark:hover:border-blue-600 transition-all"
          >
            <span className="text-xl">{platform.icon}</span>
            <span className="font-medium text-gray-700 dark:text-gray-300">
              {platform.name}
            </span>
          </a>
        ))}
      </div>

      <div className="mt-6 text-center">
        <p className="text-sm text-gray-500 dark:text-gray-400">
          点击平台图标，前往查找您想要观看的视频链接，然后复制到本站解析观看
        </p>
      </div>
    </div>
  );
}
