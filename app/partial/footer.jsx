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
    <footer className="py-4 z-[10]">
      <div className="container mx-auto text-center  flex flex-wrap justify-center space-x-4">
        {pagelink.map((link, index) => (
          <a
            key={index}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white transition text-[14px]"
          >
            {link.page}
          </a>
        ))}
      </div>

      <div className="justify-center text-center flex pt-[10px] gap-2 text-gray-500 relative">
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
            <ul className="absolute bottom-8 left-0  bg-gray-800 text-white rounded-lg shadow-lg">
              {languages.map((lang, index) => (
                <li
                  key={index}
                  onClick={() => {
                    setSelectedLanguage(lang);
                    setIsOpen(false);
                  }}
                  className="px-4 py-2 cursor-pointer hover:bg-gray-600"
                >
                  {lang}
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="text-center">
          <p className="text-[14px] text-gray-400 text-center">
            &copy; {new Date().getFullYear()} DA VE WEB P.
          </p>
          <p className="text-[10px] pt-[10px]">
            <span className="text-[14px]">Desclaimer: </span>
            <span className="text-red-400">This</span> website is just a clone
            and is not affiliated <span className="text-blue-400">with</span>{" "}
            <span className="text-red-400">Instagram</span> or{" "}
            <span className="text-red-400">Meta</span>.
          </p>
        </div>
      </div>
    </footer>
  );
}
