"use client";

import { useState, useEffect } from "react";

interface VideoPlayerProps {
  url: string;
}

const VideoPlayer = ({ url }: VideoPlayerProps) => {
  const [loading, setLoading] = useState(true);
  const jxUrl = `https://jx.aidouer.net/?url=${encodeURIComponent(url)}`;

  useEffect(() => {
    // 当URL改变时重置加载状态
    setLoading(true);

    // 模拟加载完成
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [url]);

  if (!url) {
    return (
      <div className="w-full h-[500px] flex flex-col items-center justify-center bg-black/5 dark:bg-white/5 rounded-lg gap-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-16 w-16 text-gray-400 mb-2"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <p className="text-gray-500 text-lg">请输入视频链接开始播放</p>
        <p className="text-gray-400 text-sm max-w-md text-center px-4">
          支持爱奇艺、腾讯视频、优酷等各大视频平台的VIP资源
        </p>
      </div>
    );
  }

  return (
    <div className="w-full relative">
      {loading && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/10 dark:bg-white/10 z-10 rounded-lg">
          <div className="animate-spin h-12 w-12 border-4 border-blue-500 rounded-full border-t-transparent mb-4"></div>
          <p className="text-gray-700 dark:text-gray-300 font-medium animate-pulse">
            正在加载视频，请稍候...
          </p>
        </div>
      )}
      <iframe
        src={jxUrl}
        className="w-full h-[500px] rounded-lg"
        frameBorder="0"
        allowFullScreen
        onLoad={() => setLoading(false)}
      ></iframe>
    </div>
  );
};

export default VideoPlayer;
