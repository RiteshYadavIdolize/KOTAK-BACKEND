// src/features/RuleBuilder/components/MatchStrategy.jsx
import React from 'react';
import { Cpu, Zap, Fingerprint } from 'lucide-react';

const MatchStrategy = ({ matchType, setMatchType }) => {
  const strategies = [
    { id: 'exact', name: 'Exact Match', icon: Fingerprint },
    { id: 'llm', name: 'LLM Match', icon: Cpu },
    { id: 'fuzzy', name: 'Fuzzy Match', icon: Zap }
  ];

  return (
    <div className="bg-white/40 dark:bg-zinc-800/40 backdrop-blur-md rounded-3xl p-3 border border-white/60 dark:border-zinc-700/50 shadow-sm flex flex-col gap-2 w-full">
       {/* FIXED: Title text */}
       <div className="text-[10px] font-bold text-center text-[#7a6458] dark:text-slate-300 uppercase tracking-widest my-2">Match Strategy</div>
       
       {strategies.map(type => {
         const isActive = matchType === type.id;
         const Icon = type.icon;
         return (
           <button
             key={type.id}
             onClick={() => setMatchType(type.id)}
             className={`flex items-center gap-3 px-4 py-3 rounded-2xl w-full transition-all duration-300 ${
               isActive 
               // FIXED: Active button background and text in dark mode
               ? 'bg-white/90 dark:bg-zinc-700 shadow-md text-[#3b2a21] dark:text-white font-bold border border-white dark:border-zinc-500 scale-105' 
               // FIXED: Inactive button text in dark mode
               : 'bg-transparent text-[#7a6458] dark:text-slate-400 hover:bg-white/50 dark:hover:bg-zinc-700 dark:hover:text-white border border-transparent'
             }`}
           >
             <Icon size={16} className={isActive ? 'text-blue-500 dark:text-blue-400' : ''} />
             <span className="text-[11px] font-semibold">{type.name}</span>
           </button>
         )
       })}
    </div>
  );
};

export default MatchStrategy;