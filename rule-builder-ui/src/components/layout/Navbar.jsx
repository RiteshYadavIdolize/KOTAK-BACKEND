// src/components/layout/Navbar.jsx
import React from 'react';
import { Moon, Sun } from 'lucide-react';

const Navbar = ({ isDark, toggleTheme }) => {
  return (
    <header className="h-16 mt-4 mr-4 flex items-center justify-between px-8 bg-white/40 dark:bg-zinc-900/90 backdrop-blur-xl rounded-[2rem] shadow-[0_4px_24px_0_rgba(31,38,135,0.05)] dark:shadow-sm border border-white/60 dark:border-zinc-800 transition-colors duration-300 relative z-10">
      <h2 className="text-xl font-bold text-[#3b2a21] dark:text-slate-100">
        Rule Engine Central
      </h2>
      
      {/* Theme Toggle Button */}
      <button 
        onClick={toggleTheme}
        className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/50 dark:bg-zinc-800 hover:bg-white/80 dark:hover:bg-zinc-700 transition-all border border-white/60 dark:border-zinc-700 text-[#5a463a] dark:text-slate-300 shadow-sm backdrop-blur-md"
      >
        {isDark ? <Sun size={18} className="text-amber-500" /> : <Moon size={18} className="text-[#3b2a21]" />}
        <span className="text-sm font-medium">{isDark ? 'Light Mode' : 'Dark Mode'}</span>
      </button>
    </header>
  );
};

export default Navbar;