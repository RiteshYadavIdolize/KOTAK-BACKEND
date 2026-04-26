// src/components/layout/Sidebar.jsx
import React, { useState, useEffect, useRef } from 'react';
import { Settings, ChevronDown } from 'lucide-react';

const Sidebar = () => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [isRuleMasterOpen, setIsRuleMasterOpen] = useState(true);
  const [isFlyoutOpen, setIsFlyoutOpen] = useState(false);
  const flyoutRef = useRef(null);

  useEffect(() => {
    if (isExpanded) setIsFlyoutOpen(false);
  }, [isExpanded]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (flyoutRef.current && !flyoutRef.current.contains(event.target)) {
        setIsFlyoutOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [flyoutRef]);

  return (
    <aside 
      className={`
        my-4 ml-4 h-[calc(100vh-2rem)] rounded-[2rem] 
        shadow-[0_8px_32px_0_rgba(31,38,135,0.05)] dark:shadow-xl
        bg-white/40 backdrop-blur-xl border border-white/60 text-[#3b2a21]
        dark:bg-zinc-900 dark:border-zinc-800 dark:text-slate-200
        transition-all duration-300 ease-in-out flex flex-col relative z-40
        ${isExpanded ? 'w-72' : 'w-24'}
      `}
    >
      {/* Toggle Button */}
      <button 
        onClick={() => setIsExpanded(!isExpanded)}
        className="absolute -right-4 top-12 bg-white/60 backdrop-blur-md dark:bg-zinc-800 text-[#3b2a21] dark:text-slate-200 border border-white/80 dark:border-zinc-700 rounded-full p-1.5 shadow-md z-50 hover:scale-110 transition-transform"
      >
        {isExpanded ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
      </button>

      {/* User Profile */}
      <div className={`pt-10 pb-4 flex items-center transition-all duration-300 ${isExpanded ? 'px-6 justify-start' : 'px-0 justify-center'}`}>
        <div className="w-10 h-10 rounded-full overflow-hidden bg-white/50 backdrop-blur-sm dark:bg-zinc-800 shrink-0 border border-white/60 dark:border-zinc-700 shadow-inner">
          <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Andrew" alt="Profile" className="w-full h-full object-cover" />
        </div>
        
        <div className={`flex flex-col whitespace-nowrap overflow-hidden transition-all duration-300 ${isExpanded ? 'w-[120px] opacity-100 ml-3' : 'w-0 opacity-0 ml-0'}`}>
          <span className="text-[10px] uppercase font-bold text-[#7a6458] dark:text-slate-500 tracking-wider">System Admin</span>
          <span className="text-sm font-bold text-[#3b2a21] dark:text-slate-200">Andrew Smith</span>
        </div>
      </div>

      {/* Main Menu */}
      <div className="flex-1 px-4 overflow-visible [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        
        <div className={`transition-all duration-300 overflow-hidden ${isExpanded ? 'h-8 opacity-100 mt-4 mb-2' : 'h-0 opacity-0 mt-0 mb-0'}`}>
          <p className="text-[10px] font-bold text-[#7a6458] dark:text-slate-500 px-2 whitespace-nowrap">
            MAIN
          </p>
        </div>
        
        <div className="mb-2 relative" ref={flyoutRef}>
          
          <div 
            onClick={() => {
              if (isExpanded) {
                setIsRuleMasterOpen(!isRuleMasterOpen);
              } else {
                setIsFlyoutOpen(!isFlyoutOpen);
              }
            }}
            className={`flex items-center py-3 rounded-xl cursor-pointer shadow-sm transition-all duration-300 relative z-10 border border-transparent
              ${(!isExpanded && isFlyoutOpen) || (isExpanded && isRuleMasterOpen) 
                ? 'bg-white/60 border-white/60 dark:bg-zinc-800 dark:border-transparent'
                : 'bg-white/30 hover:bg-white/50 border-white/40 dark:bg-zinc-800/50 dark:hover:bg-zinc-800 dark:border-transparent'
              }
              ${isExpanded ? 'justify-between px-3' : 'justify-center px-0'}
            `}
          >
            <div className="flex items-center">
              <Settings size={20} className="text-[#5a463a] dark:text-slate-300 shrink-0" />
              <span className={`font-semibold text-sm whitespace-nowrap overflow-hidden transition-all duration-300 ${isExpanded ? 'w-[80px] opacity-100 ml-3' : 'w-0 opacity-0 ml-0'}`}>
                Rule Master
              </span>
            </div>
            
            <div className={`overflow-hidden transition-all duration-300 flex items-center ${isExpanded ? 'w-4 opacity-100' : 'w-0 opacity-0'}`}>
              <ChevronDown 
                size={16} 
                className={`text-[#7a6458] dark:text-slate-400 transition-transform duration-300 shrink-0 ${isRuleMasterOpen ? 'rotate-180' : ''}`} 
              />
            </div>
          </div>
          
          {/* ====================================================
              FIXED: EXPANDED STATE
              Uses CSS Grid to smoothly transition height to 0.
              Added whitespace-nowrap to prevent text from wrapping.
              ==================================================== */}
          <div 
            className={`grid transition-all duration-300 ease-in-out ${isExpanded && isRuleMasterOpen ? 'grid-rows-[1fr] opacity-100 mt-2' : 'grid-rows-[0fr] opacity-0 mt-0'}`}
          >
            <div className="overflow-hidden">
              <div className="relative pb-1">
                <div className="absolute left-[21px] top-[-8px] bottom-[28px] w-[1.5px] bg-[#cbb09d]/50 dark:bg-zinc-700"></div>

                <div className="relative py-1.5 flex items-center">
                  <div className="absolute left-[21px] top-1/2 w-[16px] h-[1.5px] bg-[#cbb09d]/50 dark:bg-zinc-700"></div>
                  <span className="ml-[45px] text-[13px] font-medium text-[#7a6458] dark:text-slate-400 hover:text-[#3b2a21] dark:hover:text-white cursor-pointer transition-colors w-full whitespace-nowrap">
                    Rule View
                  </span>
                </div>
                
                <div className="relative py-1.5 flex items-center mt-1">
                  <div className="absolute left-[21px] top-[-15px] w-[16px] h-[calc(50%+15px)] border-l-[1.5px] border-b-[1.5px] border-[#cbb09d]/50 dark:border-zinc-700 rounded-bl-xl bg-transparent"></div>
                  
                  <div className="ml-[41px] w-[calc(100%-41px)] pr-2">
                    <span className="text-[13px] font-semibold bg-white/60 backdrop-blur-md dark:bg-zinc-800 text-[#3b2a21] dark:text-slate-200 py-2 px-3 rounded-lg cursor-pointer shadow-sm transition-colors border border-white/80 dark:border-zinc-700/50 block w-full whitespace-nowrap overflow-hidden text-ellipsis">
                      Rule Management
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* COLLAPSED STATE (Flyout) */}
          {!isExpanded && isFlyoutOpen && (
            <div className="absolute left-full top-0 ml-4 flex flex-col bg-white/95 backdrop-blur-3xl dark:bg-zinc-900 shadow-2xl rounded-2xl w-56 p-4 border border-white dark:border-zinc-800 z-50">
              <div className="pb-3 mb-2 border-b border-[#cbb09d]/30 dark:border-zinc-800">
                <span className="text-xs font-bold text-[#7a6458] dark:text-slate-500 uppercase tracking-wider">Rule Master</span>
              </div>

              <div className="relative mt-1">
                <div className="absolute left-[8px] top-[-8px] bottom-[28px] w-[1.5px] bg-[#cbb09d]/50 dark:bg-zinc-700"></div>

                <div className="relative py-2 flex items-center">
                  <div className="absolute left-[8px] top-1/2 w-[16px] h-[1.5px] bg-[#cbb09d]/50 dark:bg-zinc-700"></div>
                  <span className="ml-[32px] text-[13px] font-medium text-[#7a6458] dark:text-slate-400 hover:text-[#3b2a21] dark:hover:text-white cursor-pointer transition-colors w-full">
                    Rule View
                  </span>
                </div>
                
                <div className="relative py-2 flex items-center mt-1">
                  <div className="absolute left-[8px] top-[-15px] w-[16px] h-[calc(50%+15px)] border-l-[1.5px] border-b-[1.5px] border-[#cbb09d]/50 dark:border-zinc-700 rounded-bl-xl bg-transparent"></div>
                  
                  <div className="ml-[28px] w-full">
                    <span className="text-[13px] font-semibold bg-[#f8f5f2] dark:bg-zinc-800 text-[#3b2a21] dark:text-slate-200 py-2 px-3 rounded-lg cursor-pointer shadow-sm transition-colors border border-white/80 dark:border-zinc-700/50 block w-full">
                      Rule Management
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </aside>
  );
};

const ChevronLeft = ({ size, className }) => <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="m15 18-6-6 6-6"/></svg>;
const ChevronRight = ({ size, className }) => <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="m9 18 6-6-6-6"/></svg>;

export default Sidebar;