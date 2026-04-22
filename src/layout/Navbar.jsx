import React from "react";
import { Moon, Sun } from 'lucide-react';
import { MdIncompleteCircle } from "react-icons/md";
import { Outlet } from "react-router-dom";
import { useTheme } from "../context/useTheme";

export default function Navbar() {
  const { isDark, toggleTheme } = useTheme();
  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-950 overflow-hidden">
      <div className="w-20 bg-[#1e1b4b] h-screen flex flex-col items-center py-8 relative">
        {/* 1. Logo at the top */}
        <div className="">
          {/* Purple rounded rectangle with white icon */}
          <div className="w-12 h-12 bg-[#7C5DFA] rounded-2xl flex items-center justify-center">
            <span className="text-white text-3xl"><MdIncompleteCircle /></span>{" "}
          </div>
        </div>

        {/* 2. Main empty space (flex-1) */}

        {/* 3. Bottom section: Theme toggle + User avatar */}
        <div className="mt-auto flex flex-col items-center gap-8 ">
          {/* Moon / Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="text-[#7E88C3] cursor-pointer hover:text-white transition-colors"
          >
            {isDark ? <Sun size={24} /> : <Moon size={24} />}
          </button>

          {/* User Profile Picture */}
          <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white/30">
            <img
              src="https://picsum.photos/id/64/300/300"
              alt="User"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <main className="flex-1 overflow-auto p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
