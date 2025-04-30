"use client";

import { useState, useEffect } from "react";
import VideoPlayer from "@/components/VideoPlayer";
import FAQ from "../components/FAQ";
import PlatformLinks from "@/components/PlatformLinks";
import MovieCards from "@/components/MovieCards";
import {
  getPlayHistory,
  removeFromPlayHistory,
  clearPlayHistory,
  PlayHistoryItem,
  formatDateTime,
  formatPlayTime,
  detectPlatform,
} from "@/lib/playHistory";

export default function Home() {
  const [videoUrl, setVideoUrl] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [history, setHistory] = useState<PlayHistoryItem[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 初始化时从本地存储加载播放历史
  useEffect(() => {
    const savedHistory = getPlayHistory();
    setHistory(savedHistory);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    setIsSubmitting(true);

    // 模拟加载延迟，实际项目中可能不需要
    setTimeout(() => {
      setVideoUrl(inputValue);
      setIsSubmitting(false);

      // 历史记录已在VideoPlayer组件中更新
    }, 800);
  };

  // 处理播放进度更新
  const handleProgressUpdate = (currentTime: number, duration: number) => {
    // 当播放进度更新时，刷新历史记录列表
    setHistory(getPlayHistory());
  };

  // 删除历史记录
  const handleRemoveHistory = (url: string, e: React.MouseEvent) => {
    e.stopPropagation(); // 阻止事件冒泡
    const updatedHistory = removeFromPlayHistory(url);
    setHistory(updatedHistory);
  };

  // 清空所有历史记录
  const handleClearHistory = () => {
    clearPlayHistory();
    setHistory([]);
  };

  // 当选择电影卡片时
  const handleSelectMovie = (url: string) => {
    setInputValue(url);
    setVideoUrl(url);

    // 自动滚动到播放器位置
    setTimeout(() => {
      const playerElement = document.getElementById("video-player");
      if (playerElement) {
        playerElement.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 300);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-indigo-950 p-4 md:p-8">
      <header className="max-w-6xl mx-auto mb-8">
        <div className="flex flex-col items-center mt-8 mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 mb-2">
            全网VIP视频解析
          </h1>
          <p className="text-gray-600 dark:text-gray-300 text-lg md:text-xl">
            一站式观看各大平台VIP影视资源
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="max-w-4xl mx-auto flex flex-col sm:flex-row gap-2 mb-8"
        >
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="请输入视频链接，如：https://v.qq.com/x/cover/..."
            className="flex-1 px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            disabled={isSubmitting}
          />
          <button
            type="submit"
            disabled={isSubmitting || !inputValue.trim()}
            className={`px-6 py-3 rounded-lg ${
              isSubmitting || !inputValue.trim()
                ? "bg-blue-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            } text-white font-medium transition-colors shadow-md hover:shadow-lg flex items-center justify-center min-w-[120px]`}
          >
            {isSubmitting ? (
              <>
                <svg
                  className="animate-spin -ml-1 mr-2 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                处理中...
              </>
            ) : (
              <>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                立即播放
              </>
            )}
          </button>
        </form>
      </header>

      <main className="max-w-6xl mx-auto">
        <div className="mb-8" id="video-player">
          <VideoPlayer url={videoUrl} onProgressUpdate={handleProgressUpdate} />
        </div>

        {/* 快捷播放模块 */}
        <div className="mb-8">
          <MovieCards onSelectMovie={handleSelectMovie} />
        </div>

        {history.length > 0 && (
          <div className="mt-8">
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300">
                播放历史
              </h3>
              <button
                onClick={handleClearHistory}
                className="text-xs text-red-500 hover:text-red-600 dark:text-red-400 dark:hover:text-red-300"
              >
                清空历史
              </button>
            </div>
            <div className="space-y-2">
              {history.map((item, index) => (
                <div
                  key={index}
                  className="relative bg-white dark:bg-gray-800 rounded-lg p-3 shadow hover:shadow-md transition-shadow"
                >
                  <button
                    onClick={() => {
                      setInputValue(item.url);
                      setVideoUrl(item.url);
                    }}
                    className="text-left w-full pr-24"
                  >
                    <div className="flex items-center gap-2">
                      <span className="inline-block px-2 py-1 text-xs text-white bg-blue-500 dark:bg-blue-600 rounded-md">
                        {item.platform || detectPlatform(item.url)}
                      </span>
                      <div className="truncate text-blue-600 dark:text-blue-400 font-medium">
                        {item.title || item.url}
                      </div>
                    </div>
                    <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
                      <span>播放于: {formatDateTime(item.timestamp)}</span>
                      {item.currentTime !== undefined && (
                        <span>
                          进度: {formatPlayTime(item.currentTime)}{" "}
                          {item.duration
                            ? `/ ${formatPlayTime(item.duration)}`
                            : ""}
                        </span>
                      )}
                    </div>
                  </button>
                  <button
                    onClick={(e) => handleRemoveHistory(item.url, e)}
                    className="absolute right-3 top-3 text-gray-400 hover:text-red-500 dark:hover:text-red-400"
                    title="删除"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        <PlatformLinks />

        <FAQ />
      </main>

      <footer className="max-w-6xl mx-auto mt-16 py-6 border-t border-gray-200 dark:border-gray-800">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            © {new Date().getFullYear()} VIP视频解析工具，仅供学习和参考。
          </p>
          <div className="flex gap-4">
            <a
              href="#"
              className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 text-sm"
            >
              使用说明
            </a>
            <a
              href="#"
              className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 text-sm"
            >
              免责声明
            </a>
            <a
              href="#"
              className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 text-sm"
            >
              关于我们
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
