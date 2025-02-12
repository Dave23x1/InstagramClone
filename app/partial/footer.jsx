"use client";

import { useState } from "react";
import pagelink from "@/Static/pagelink.json";

export default function Footer() {
  const [selectedLanguage, setSelectedLanguage] = useState("English");
  const [isOpen, setIsOpen] = useState(false);

  const languages = [
    "English",
    "Español",
    "Français",
    "Deutsch",
    "中文",
    "日本語",
  ];

  return (
    <footer className="py-4">
      <div className="container mx-auto flex flex-wrap justify-center space-x-4">
        {pagelink.map((link, index) => (
          <a
            key={index}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-500 hover:text-white transition"
          >
            {link.page}
          </a>
        ))}
      </div>

      <div className="justify-center flex pt-[10px] gap-2 text-gray-500 relative">
        <div className="relative">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center space-x-1 text-gray-500 hover:text-white transition"
          >
            <span>{selectedLanguage}</span>
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>

          {isOpen && (
            <ul className="absolute bottom-8 left-0 w-32 bg-gray-800 text-white rounded-lg shadow-lg">
              {languages.map((lang, index) => (
                <li
                  key={index}
                  onClick={() => {
                    setSelectedLanguage(lang);
                    setIsOpen(false);
                  }}
                  className="px-4 py-2 cursor-pointer hover:bg-gray-700"
                >
                  {lang}
                </li>
              ))}
            </ul>
          )}
        </div>

        <p className="text-sm">
          &copy; {new Date().getFullYear()} Instagram from Meta
        </p>
      </div>
    </footer>
  );
}
