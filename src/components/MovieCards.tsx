"use client";

import { useState } from "react";
import { addToPlayHistory } from "@/lib/playHistory";

interface Movie {
  id: string;
  title: string; // 电影标题
  subTitle?: string; // 电影副标题或描述
  imageUrl: string; // 电影海报图片链接
  platform: string; // 视频平台
  url: string; // 视频链接
  isVip?: boolean; // 是否为VIP内容
}

// 热门电影数据
const popularMovies: Movie[] = [
  {
    id: "1",
    title: "巨齿鲨",
    subTitle: "斯坦森李冰冰对战巨鲨",
    imageUrl: "/images/movies/meg.jpg",
    platform: "腾讯视频",
    url: "https://v.qq.com/x/cover/6kq9o0hr79kamlt/g00271hm0os.html?url_from=share",
    isVip: true,
  },
  {
    id: "2",
    title: "机械师",
    subTitle: "斯坦森再演冷血杀手",
    imageUrl: "/images/movies/mechanic.jpg",
    platform: "腾讯视频",
    url: "https://v.qq.com/x/cover/piegqd6mz97tr8b/x001578ogw1.html?url_from=share",
    isVip: true,
  },
  {
    id: "3",
    title: "敢死队",
    subTitle: "硬汉集火力大银幕",
    imageUrl: "/images/movies/expendables.jpg",
    platform: "腾讯视频",
    url: "https://v.qq.com/x/cover/xex6po9q55akzsr/t0042eaj0c5.html?url_from=share",
    isVip: true,
  },
  {
    id: "4",
    title: "家园防线",
    subTitle: "硬汉单刀血洗毒窝",
    imageUrl: "/images/movies/homefront.jpg",
    platform: "腾讯视频",
    url: "https://v.qq.com/x/cover/1394t3emkthlxbk/w001417rk6v.html?url_from=share",
    isVip: true,
  },
  {
    id: "5",
    title: "蜂鸟特攻",
    subTitle: "文艺范儿杀手肌肉男",
    imageUrl: "/images/movies/killer.jpg",
    platform: "腾讯视频",
    url: "https://v.qq.com/x/cover/qkqnhdzdefud3l3/e0023egfb9q.html?url_from=share",
    isVip: true,
  },
  {
    id: "6",
    title: "银行大劫案",
    subTitle: "斯坦森抢银行玩抢险",
    imageUrl: "/images/movies/bankjob.jpg",
    platform: "腾讯视频",
    url: "https://v.qq.com/x/cover/cfrqr2077rtuvdl/z00305qng3w.html?url_from=share",
    isVip: true,
  },
  {
    id: "7",
    title: "铁血精英",
    subTitle: "斯坦森联手杰尼亚",
    imageUrl: "/images/movies/killerelite.jpg",
    platform: "腾讯视频",
    url: "https://v.qq.com/x/cover/kz9sjwa9nm2gvb2/9pmz8vAW4n2.html?url_from=share",
    isVip: true,
  },
];

interface MovieCardsProps {
  onSelectMovie: (url: string) => void;
}

const MovieCards = ({ onSelectMovie }: MovieCardsProps) => {
  // 当点击电影卡片时触发
  const handleMovieClick = (movie: Movie) => {
    // 将选中的电影URL传递给父组件
    onSelectMovie(movie.url);

    // 自动添加到播放历史
    addToPlayHistory({
      url: movie.url,
      title: movie.title,
      platform: movie.platform,
      timestamp: Date.now(),
    });
  };

  return (
    <div className="mt-8 mb-12">
      <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-4">
        热门推荐
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3">
        {popularMovies.map((movie) => (
          <div
            key={movie.id}
            className="relative group cursor-pointer rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
            onClick={() => handleMovieClick(movie)}
          >
            <div className="relative aspect-[2/3] overflow-hidden">
              {/* 使用一个占位背景色，直到图片加载完成 */}
              <div className="absolute inset-0 bg-gray-300 dark:bg-gray-700 animate-pulse"></div>

              {/* 电影海报 */}
              <img
                src={movie.imageUrl}
                alt={movie.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                onError={(e) => {
                  // 图片加载失败时使用占位图
                  (e.target as HTMLImageElement).src =
                    "https://via.placeholder.com/300x450?text=电影海报";
                }}
              />

              {/* VIP标记 */}
              {movie.isVip && (
                <span className="absolute top-1 right-1 bg-yellow-500 text-xs font-bold text-white px-2 py-0.5 rounded z-10">
                  VIP
                </span>
              )}

              {/* 渐变遮罩效果 */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-70 group-hover:opacity-90 transition-opacity"></div>

              {/* 悬停时显示的播放按钮 */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="rounded-full bg-blue-600 p-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 text-white"
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
                </div>
              </div>
            </div>

            {/* 电影信息 */}
            <div className="px-2 py-2 bg-white dark:bg-gray-800">
              <h3 className="text-center font-medium text-gray-900 dark:text-gray-100 truncate">
                {movie.title}
              </h3>
              <p className="text-center text-xs text-gray-500 dark:text-gray-400 truncate mt-0.5">
                {movie.subTitle}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieCards;
