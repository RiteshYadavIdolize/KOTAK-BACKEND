// src/features/RuleBuilder/components/DocumentColumn.jsx
import React from 'react';
import { FileText, ChevronRight, CheckCircle2, Loader2 } from 'lucide-react';

const DocumentColumn = ({ title, documents, isLoadingDocs, selectedDoc, fields, selectedField, isLoadingFields, onSelectDoc, onSelectField }) => {
  return (
    <div className="flex flex-col h-full bg-white/40 dark:bg-zinc-800/40 backdrop-blur-md rounded-[2rem] border border-white/60 dark:border-zinc-700/50 shadow-sm overflow-hidden relative min-h-0 pb-4">
      
      {!selectedDoc ? (
        <div className="flex flex-col h-full w-full min-h-0">
          <div className="shrink-0 p-6 pb-4">
            {/* FIXED: Brightened dark text to slate-300 */}
            <h3 className="text-[11px] font-bold text-[#7a6458] dark:text-slate-300 uppercase tracking-widest">
              Select {title} Document
            </h3>
          </div>
          
          {isLoadingDocs ? (
            <div className="flex-1 flex flex-col items-center justify-center text-[#7a6458] dark:text-slate-300">
              {/* FIXED: Brightened loader text (Moved comment inside the div) */}
              <Loader2 size={24} className="animate-spin mb-2" />
              <span className="text-xs font-medium uppercase tracking-wider">Loading...</span>
            </div>
          ) : (
            <div className="flex-1 overflow-y-auto px-6 space-y-2 custom-scrollbar">
              {documents.map(doc => (
                <div 
                  key={doc.ID}
                  onClick={() => onSelectDoc(doc)}
                  className="group flex items-center justify-between p-4 bg-white/50 dark:bg-zinc-800/60 hover:bg-white/80 dark:hover:bg-zinc-700/80 rounded-2xl cursor-pointer transition-all border border-white/40 dark:border-transparent hover:border-[#dfc4b1] dark:hover:border-zinc-500 shadow-sm"
                >
                  <div className="flex items-center gap-3">
                    {/* FIXED: Icon colors in dark mode */}
                    <FileText size={18} className="text-[#cbb09d] dark:text-slate-400 group-hover:text-[#5a463a] dark:group-hover:text-slate-200 transition-colors" />
                    {/* FIXED: Document name text to pure white in dark mode */}
                    <span className="font-semibold text-sm text-[#3b2a21] dark:text-white">{doc.Name}</span>
                  </div>
                  {/* FIXED: Chevron color in dark mode */}
                  <ChevronRight size={16} className="text-[#cbb09d] dark:text-slate-500 group-hover:translate-x-1 transition-transform dark:group-hover:text-slate-300" />
                </div>
              ))}
              <div className="h-6 w-full shrink-0"></div>
            </div>
          )}
        </div>
      ) : (
        <div className="flex flex-col h-full w-full min-h-0">
          <div className="shrink-0 p-4 border-b border-white/50 dark:border-zinc-700/50 bg-white/60 dark:bg-zinc-800/60 flex items-center justify-between z-10 shadow-sm">
             <div className="flex items-center gap-3 truncate pr-4">
                {/* FIXED: Header Icon */}
                <FileText size={18} className="text-[#3b2a21] dark:text-slate-300 shrink-0" />
                {/* FIXED: Header Text */}
                <span className="font-bold text-sm text-[#3b2a21] dark:text-white truncate">{selectedDoc.Name}</span>
              </div>
              {/* FIXED: Change button text */}
              <button 
                onClick={() => onSelectDoc(null)}
                className="text-[10px] font-bold uppercase tracking-wider text-[#7a6458] dark:text-slate-300 hover:text-[#3b2a21] dark:hover:text-white px-3 py-1.5 bg-white/50 dark:bg-zinc-700/50 hover:bg-white/80 dark:hover:bg-zinc-600 rounded-full transition-colors shrink-0"
              >
                Change
              </button>
          </div>

          <div className="flex-1 overflow-y-auto relative custom-scrollbar">
            {isLoadingFields ? (
               <div className="absolute inset-0 flex flex-col items-center justify-center text-[#7a6458] dark:text-slate-300">
                 <Loader2 size={24} className="animate-spin mb-2" />
                 <span className="text-xs font-medium uppercase tracking-wider">Fetching Fields...</span>
               </div>
            ) : (
              <div className="px-6 pt-6 relative">
                {/* FIXED: Registry header text */}
                <h3 className="text-[10px] font-bold text-[#7a6458] dark:text-slate-300 uppercase tracking-widest mb-4">Field Registry</h3>
                <div className="relative mt-2">
                  <div className="absolute left-[15px] top-[-10px] bottom-[28px] w-[2px] bg-[#cbb09d]/60 dark:bg-zinc-600 rounded-full"></div>
                  {fields.map((field, index) => {
                    const isSelected = selectedField?.id === field.id;
                    const isLast = index === fields.length - 1;
                    return (
                      <div key={field.id} className="relative py-2 flex items-center group">
                        {isLast ? (
                           <div className="absolute left-[15px] top-0 w-[24px] h-1/2 border-l-[2px] border-b-[2px] border-[#cbb09d]/60 dark:border-zinc-600 rounded-bl-xl bg-transparent pointer-events-none"></div>
                        ) : (
                           <div className="absolute left-[15px] top-1/2 w-[24px] h-[2px] bg-[#cbb09d]/60 dark:bg-zinc-600 pointer-events-none"></div>
                        )}
                        <div className="ml-[48px] w-full pr-2">
                          <div 
                            onClick={() => onSelectField(field)}
                            className={`flex items-center justify-between px-4 py-3 rounded-xl cursor-pointer transition-all duration-300 ${isSelected ? 'bg-white/90 dark:bg-zinc-700 shadow-md border-white/80 dark:border-zinc-500 scale-[1.02] border' : 'bg-white/30 dark:bg-zinc-800/50 hover:bg-white/60 dark:hover:bg-zinc-700 border-transparent border'}`}
                          >
                            {/* FIXED: Field item text. Slate-300 for unselected, pure White for selected */}
                            <span className={`text-sm transition-colors ${isSelected ? 'text-[#3b2a21] dark:text-white font-bold' : 'text-[#5a463a] dark:text-slate-300 font-medium'}`}>{field.Field_Name}</span>
                            {isSelected && <CheckCircle2 size={16} className="text-emerald-600 dark:text-emerald-400 animate-in zoom-in shrink-0 ml-2" />}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div className="h-6 w-full shrink-0"></div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default DocumentColumn;