"use client";

import { useState } from "react";

interface FAQItem {
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    question: "如何使用这个VIP视频解析工具？",
    answer:
      "只需将您想要观看的VIP视频链接复制到输入框中，然后点击'立即播放'按钮即可开始观看。支持爱奇艺、腾讯视频、优酷等主流视频平台。",
  },
  {
    question: "支持哪些视频平台？",
    answer:
      "本工具支持爱奇艺、腾讯视频、优酷、芒果TV、搜狐视频、PPTV、乐视视频等多个主流视频平台。",
  },
  {
    question: "视频加载很慢或无法播放怎么办？",
    answer:
      "可能是由于网络连接问题或解析接口临时不可用。您可以尝试刷新页面或稍后再试。如果问题持续存在，可能需要尝试其他解析接口。",
  },
  {
    question: "为什么有些视频无法解析？",
    answer:
      "某些特殊的视频可能无法解析，例如刚上线的新剧或受到特殊保护的内容。解析接口会不断更新以支持更多内容。",
  },
  {
    question: "使用这个工具安全吗？",
    answer:
      "本工具仅提供视频解析服务，不会收集您的个人信息。但建议您不要在解析页面输入个人账号密码等敏感信息。",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="w-full max-w-4xl mx-auto mt-12">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-6">
        常见问题
      </h2>
      <div className="space-y-4">
        {faqData.map((faq, index) => (
          <div
            key={index}
            className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden"
          >
            <button
              onClick={() => toggleFAQ(index)}
              className="w-full flex justify-between items-center p-4 text-left bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700"
            >
              <span className="font-medium text-gray-900 dark:text-white">
                {faq.question}
              </span>
              <svg
                className={`w-5 h-5 text-gray-500 transition-transform ${
                  openIndex === index ? "transform rotate-180" : ""
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            {openIndex === index && (
              <div className="p-4 bg-gray-50 dark:bg-gray-700/50 border-t border-gray-200 dark:border-gray-700">
                <p className="text-gray-600 dark:text-gray-300">{faq.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
