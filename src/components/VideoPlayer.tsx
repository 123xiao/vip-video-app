"use client";

import { useState, useEffect, useRef } from "react";
import {
  addToPlayHistory,
  updatePlayProgress,
  getPlayHistory,
  PlayHistoryItem,
  detectPlatform,
} from "@/lib/playHistory";

interface VideoPlayerProps {
  url: string;
  onProgressUpdate?: (currentTime: number, duration: number) => void;
}

const VideoPlayer = ({ url, onProgressUpdate }: VideoPlayerProps) => {
  const [loading, setLoading] = useState(true);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const jxUrl = `https://jx.aidouer.net/?url=${encodeURIComponent(url)}`;

  // 检查是否存在播放记录
  useEffect(() => {
    if (!url) return;

    // 查找该URL的播放记录
    const history = getPlayHistory();
    const existingRecord = history.find((item) => item.url === url);
    const platform = detectPlatform(url);

    if (existingRecord) {
      // 记录此次播放
      addToPlayHistory({
        url,
        platform,
        timestamp: Date.now(),
        currentTime: existingRecord.currentTime,
        duration: existingRecord.duration,
      });
    } else {
      // 添加新的播放记录
      addToPlayHistory({
        url,
        platform,
        timestamp: Date.now(),
      });
    }
  }, [url]);

  useEffect(() => {
    // 当URL改变时重置加载状态
    setLoading(true);

    // 模拟加载完成
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [url]);

  // 定期更新播放进度
  useEffect(() => {
    if (!url) return;

    // 播放进度更新间隔（每30秒更新一次）
    const progressInterval = setInterval(() => {
      try {
        // 尝试从iframe获取播放进度
        // 注意：这可能存在跨域限制，实际应用中可能需要不同的方法
        if (iframeRef.current) {
          // 由于跨域限制，我们无法直接获取iframe内容的播放进度
          // 此处仅为示例，实际项目中可能需要通过消息传递或其他方式获取

          // 模拟更新进度（实际项目中应替换为真实数据）
          const mockCurrentTime = Math.floor(Math.random() * 100);
          const mockDuration = 120;

          updatePlayProgress(url, mockCurrentTime, mockDuration);

          if (onProgressUpdate) {
            onProgressUpdate(mockCurrentTime, mockDuration);
          }
        }
      } catch (error) {
        console.error("更新播放进度失败", error);
      }
    }, 30000); // 每30秒更新一次

    return () => clearInterval(progressInterval);
  }, [url, onProgressUpdate]);

  // 离开页面前保存播放进度
  useEffect(() => {
    const handleBeforeUnload = () => {
      if (url) {
        // 模拟保存最终进度（实际项目中应替换为真实数据）
        const mockCurrentTime = Math.floor(Math.random() * 100);
        const mockDuration = 120;
        updatePlayProgress(url, mockCurrentTime, mockDuration);
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      handleBeforeUnload(); // 组件卸载时也保存进度
    };
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
        ref={iframeRef}
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
