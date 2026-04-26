// src/App.jsx
import React, { useState } from 'react';
import Sidebar from './components/layout/Sidebar';
import Navbar from './components/layout/Navbar';
import RuleCanvas from './features/RuleBuilder/RuleCanvas';

function App() {
  const [isDark, setIsDark] = useState(false);
  const toggleTheme = () => setIsDark(!isDark);

  return (
    <div className={`${isDark ? 'dark' : ''}`}>
      <div className="relative flex min-h-screen bg-[#f8f5f2] dark:bg-zinc-950 transition-colors duration-500 overflow-hidden text-[#3b2a21] dark:text-slate-100 z-0">
        
        {/* Background orbs */}
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-gradient-to-br from-[#fbc2eb]/60 to-[#a6c1ee]/60 blur-[120px] pointer-events-none dark:opacity-5 transition-opacity duration-500"></div>
        <div className="absolute bottom-[-10%] right-[-5%] w-[40%] h-[60%] rounded-full bg-gradient-to-tl from-[#ffecd2]/80 to-[#fcb69f]/80 blur-[120px] pointer-events-none dark:opacity-5 transition-opacity duration-500"></div>

        <Sidebar />

        {/* CHANGED: Reduced pl-6 to pl-4 to shrink the gap next to the sidebar */}
        <main className="flex-1 flex flex-col h-screen overflow-y-auto pl-4 relative z-10 custom-scrollbar">
          <Navbar isDark={isDark} toggleTheme={toggleTheme} />
          
          {/* CHANGED: Reduced outer padding from p-4 to p-2 */}
          <div className="p-2 pr-4 overflow-y-hidden h-full flex flex-col">
            
            {/* CHANGED: Removed max-w-[1400px] entirely so it stretches, added w-full */}
            <div className="w-full mx-auto pt-2 flex flex-col h-full pb-2">
              <header className="mb-4 shrink-0 px-2">
                <h2 className="text-3xl font-bold text-[#3b2a21] dark:text-white drop-shadow-sm">
                  Rule Making Interface
                </h2>
                <p className="text-[#7a6458] dark:text-slate-400 mt-1">
                  Configure your system logic here.
                </p>
              </header>

              {/* CHANGED: Reduced padding inside the glass box from p-6 to p-4 */}
              <div className="flex-1 p-4 bg-white/40 dark:bg-zinc-900/90 backdrop-blur-xl rounded-[2rem] shadow-[0_8px_32px_0_rgba(31,38,135,0.05)] dark:shadow-xl border border-white/60 dark:border-zinc-800 transition-colors duration-300 overflow-hidden relative">
                <RuleCanvas />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;