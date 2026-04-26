// src/features/RuleBuilder/RuleCanvas.jsx
import React, { useState, useEffect } from 'react';
import { FileText, ChevronRight, CornerDownRight, CheckCircle2, Cpu, Zap, Fingerprint, Loader2 } from 'lucide-react';

const RuleCanvas = () => {
  const [documents, setDocuments] = useState([]);
  const [isLoadingDocs, setIsLoadingDocs] = useState(true);
  
  const [leftDoc, setLeftDoc] = useState(null);
  const [leftFields, setLeftFields] = useState([]);
  const [leftSelectedField, setLeftSelectedField] = useState(null);
  const [isLeftLoading, setIsLeftLoading] = useState(false);

  const [rightDoc, setRightDoc] = useState(null);
  const [rightFields, setRightFields] = useState([]);
  const [rightSelectedField, setRightSelectedField] = useState(null);
  const [isRightLoading, setIsRightLoading] = useState(false);

  const [matchType, setMatchType] = useState(null);
  const [isSaving, setIsSaving] = useState(false);

  // 1. Fetch Master Document List
  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        setIsLoadingDocs(true);
        const response = await fetch('http://localhost:3000/api/documents'); 
        if (!response.ok) throw new Error('Fetch failed');
        const responseData = await response.json();
        
        if (responseData.success && Array.isArray(responseData.data)) {
            setDocuments(responseData.data);
        } else {
            setDocuments(responseData);
        }
      } catch (error) {
        console.error(error);
        setDocuments([
          { ID: 1, Name: 'Aadhaar Consent' },
          { ID: 2, Name: 'PAN Card' }
        ]);
      } finally {
        setIsLoadingDocs(false);
      }
    };
    fetchDocuments();
  }, []);

  // 2. Fetch Field Registry
  const handleSelectDoc = async (side, doc) => {
    if (side === 'left') {
      setLeftDoc(doc);
      setLeftSelectedField(null);
      if (!doc) return; 
      setIsLeftLoading(true);
    } else {
      setRightDoc(doc);
      setRightSelectedField(null);
      if (!doc) return;
      setIsRightLoading(true);
    }

    try {
      const response = await fetch(`http://localhost:3000/api/documents/${doc.ID}/fields`);
      if (!response.ok) throw new Error('Fetch fields failed');
      const responseData = await response.json();
      
      let fieldsArray = responseData.success && Array.isArray(responseData.data) 
        ? responseData.data 
        : responseData;
      
      side === 'left' ? setLeftFields(fieldsArray) : setRightFields(fieldsArray);
    } catch (error) {
      console.error(error);
      const mockFields = [
        { id: 16, Field_Name: 'Name_As_Per_Aadhaar' },
        { id: 17, Field_Name: 'Email_ID' },
        { id: 18, Field_Name: 'Mobile_Number' },
        { id: 19, Field_Name: 'Last_4_Digits_Aadhaar' },
        { id: 20, Field_Name: 'Signature' }
      ];
      side === 'left' ? setLeftFields(mockFields) : setRightFields(mockFields);
    } finally {
      side === 'left' ? setIsLeftLoading(false) : setIsRightLoading(false);
    }
  };

  // 3. Save Rule
  const handleSave = async () => {
    setIsSaving(true);
    await new Promise(resolve => setTimeout(resolve, 1200));
    alert(`Success! Simulated saving rule.`);
    setIsSaving(false);
  };

  // ==========================================
  // REUSABLE COLUMN COMPONENT
  // ==========================================
  const DocumentColumn = ({ side, selectedDoc, fields, selectedField, isLoading, onSelectDoc, onSelectField }) => (
    // ADDED min-h-0 HERE to fix the flexbox infinite stretch bug
    <div className="flex flex-col h-full bg-white/40 dark:bg-zinc-800/40 backdrop-blur-md rounded-[2rem] border border-white/60 dark:border-zinc-700/50 shadow-sm overflow-hidden relative min-h-0">
      
      {!selectedDoc ? (
        /* --- STATE 1: DOCUMENT LIST --- */
        <div className="flex flex-col h-full w-full min-h-0">
          <div className="shrink-0 p-6 pb-4">
            <h3 className="text-[11px] font-bold text-[#7a6458] dark:text-slate-400 uppercase tracking-widest">
              Select {side === 'left' ? 'Source' : 'Target'} Document
            </h3>
          </div>
          
          {isLoadingDocs ? (
            <div className="flex-1 flex flex-col items-center justify-center text-[#7a6458] pb-10 min-h-0">
              <Loader2 size={24} className="animate-spin mb-2" />
              <span className="text-xs font-medium uppercase tracking-wider">Loading...</span>
            </div>
          ) : (
            /* ADDED min-h-0 and standard overflow-y-auto to guarantee the scrollbar appears */
            <div className="flex-1 overflow-y-auto min-h-0 px-6 pb-6 space-y-2 pr-4">
              {documents.map(doc => (
                <div 
                  key={doc.ID}
                  onClick={() => onSelectDoc(side, doc)}
                  className="group flex items-center justify-between p-4 bg-white/50 dark:bg-zinc-800/60 hover:bg-white/80 dark:hover:bg-zinc-700/80 rounded-2xl cursor-pointer transition-all border border-white/40 dark:border-transparent hover:border-[#dfc4b1] dark:hover:border-zinc-600 shadow-sm"
                >
                  <div className="flex items-center gap-3">
                    <FileText size={18} className="text-[#cbb09d] group-hover:text-[#5a463a] transition-colors" />
                    <span className="font-semibold text-sm text-[#3b2a21] dark:text-slate-200">{doc.Name}</span>
                  </div>
                  <ChevronRight size={16} className="text-[#cbb09d] group-hover:translate-x-1 transition-transform" />
                </div>
              ))}
            </div>
          )}
        </div>

      ) : (

        /* --- STATE 2: TREE VIEW OF FIELDS --- */
        <div className="flex flex-col h-full w-full min-h-0">
          
          {/* ROOT DOCUMENT HEADER */}
          <div className="shrink-0 p-4 border-b border-white/50 dark:border-zinc-700/50 bg-white/60 dark:bg-zinc-800/60 flex items-center justify-between z-10 shadow-sm">
             <div className="flex items-center gap-3 truncate pr-4">
                <FileText size={18} className="text-[#3b2a21] shrink-0" />
                <span className="font-bold text-sm text-[#3b2a21] dark:text-slate-100 truncate">{selectedDoc.Name}</span>
              </div>
              <button 
                onClick={() => onSelectDoc(side, null)}
                className="text-[10px] font-bold uppercase tracking-wider text-[#7a6458] hover:text-[#3b2a21] px-3 py-1.5 bg-white/50 hover:bg-white/80 rounded-full transition-colors shrink-0"
              >
                Change
              </button>
          </div>

          {/* SCROLLING FIELD REGISTRY */}
          {/* ADDED min-h-0 to force scrolling */}
          <div className="flex-1 overflow-y-auto min-h-0 relative pr-2">
            
            {isLoading ? (
               <div className="absolute inset-0 flex flex-col items-center justify-center text-[#7a6458]">
                 <Loader2 size={24} className="animate-spin mb-2" />
                 <span className="text-xs font-medium uppercase tracking-wider">Fetching Fields...</span>
               </div>
            ) : (
              <div className="p-6 relative">
                <h3 className="text-[10px] font-bold text-[#7a6458] uppercase tracking-widest mb-4">Field Registry</h3>
                
                <div className="relative mt-2">
                  <div className="absolute left-[15px] top-[-10px] bottom-[28px] w-[2px] bg-[#cbb09d]/60 rounded-full"></div>

                  {fields.map((field, index) => {
                    const isSelected = selectedField?.id === field.id;
                    const isLast = index === fields.length - 1;

                    return (
                      <div key={field.id} className="relative py-2 flex items-center group">
                        
                        {isLast ? (
                           <div className="absolute left-[15px] top-0 w-[24px] h-1/2 border-l-[2px] border-b-[2px] border-[#cbb09d]/60 rounded-bl-xl bg-transparent pointer-events-none"></div>
                        ) : (
                           <div className="absolute left-[15px] top-1/2 w-[24px] h-[2px] bg-[#cbb09d]/60 pointer-events-none"></div>
                        )}
                        
                        <div className="ml-[48px] w-full pr-2">
                          <div 
                            onClick={() => onSelectField(side, field)}
                            className={`
                              flex items-center justify-between px-4 py-3 rounded-xl cursor-pointer transition-all duration-300
                              ${isSelected 
                                ? 'bg-white/90 dark:bg-zinc-700/80 shadow-md border-white/80 scale-[1.02] border' 
                                : 'bg-white/30 dark:bg-zinc-800/30 hover:bg-white/60 border-transparent border'
                              } 
                            `}
                          >
                            <span className={`text-sm transition-colors ${isSelected ? 'text-[#3b2a21] font-bold' : 'text-[#5a463a] font-medium'}`}>
                              {field.Field_Name}
                            </span>
                            {isSelected && <CheckCircle2 size={16} className="text-emerald-600 animate-in zoom-in shrink-0 ml-2" />}
                          </div>
                        </div>

                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

        </div>
      )}
    </div>
  );

  return (
    <div className="h-full flex flex-col relative w-full overflow-hidden min-h-0">
      
      {/* ADDED min-h-0 here to ensure the overall grid knows it's allowed to shrink and scroll */}
      <div className="flex-1 grid grid-cols-[1fr_180px_1fr] gap-4 overflow-hidden pb-16 min-h-0">
        
        <DocumentColumn 
          side="left" 
          selectedDoc={leftDoc} 
          fields={leftFields} 
          selectedField={leftSelectedField}
          isLoading={isLeftLoading}
          onSelectDoc={handleSelectDoc}
          onSelectField={(side, field) => setLeftSelectedField(field)}
        />

        {/* CENTER COLUMN: Match Strategy */}
        {/* Changed justify-center to pt-10 so it aligns cleanly near the top and doesn't get pushed down */}
        <div className="flex flex-col items-center pt-8 gap-4 relative h-full">
          
          {/* Added shrink-0 so flexbox doesn't crush the buttons */}
          <div className="bg-white/40 dark:bg-zinc-800/40 backdrop-blur-md rounded-3xl p-3 border border-white/60 shadow-sm flex flex-col gap-2 w-full z-10 relative shrink-0">
             <div className="text-[10px] font-bold text-center text-[#7a6458] uppercase tracking-widest my-2">Match Strategy</div>
             
             {[
               { id: 'exact', name: 'Exact Match', icon: Fingerprint },
               { id: 'llm', name: 'LLM Match', icon: Cpu },
               { id: 'fuzzy', name: 'Fuzzy Match', icon: Zap }
             ].map(type => {
               const isActive = matchType === type.id;
               const Icon = type.icon;
               return (
                 <button
                   key={type.id}
                   onClick={() => setMatchType(type.id)}
                   className={`
                     flex items-center gap-3 px-4 py-3 rounded-2xl w-full transition-all duration-300
                     ${isActive 
                        ? 'bg-white/90 shadow-md text-[#3b2a21] font-bold border border-white scale-105' 
                        : 'bg-transparent text-[#7a6458] hover:bg-white/50 border border-transparent'
                     }
                   `}
                 >
                   <Icon size={16} className={isActive ? 'text-blue-500' : ''} />
                   <span className="text-[11px] font-semibold">{type.name}</span>
                 </button>
               )
             })}
          </div>

          {(leftSelectedField || rightSelectedField) && (
             <div className="absolute top-1/2 left-[-20px] right-[-20px] h-[2px] bg-[#cbb09d]/40 -z-10 rounded-full transition-all duration-500"></div>
          )}
        </div>

        <DocumentColumn 
          side="right" 
          selectedDoc={rightDoc} 
          fields={rightFields} 
          selectedField={rightSelectedField}
          isLoading={isRightLoading}
          onSelectDoc={handleSelectDoc}
          onSelectField={(side, field) => setRightSelectedField(field)}
        />
      </div>

      {/* FLOATING SAVE BUTTON */}
      <div className={`
        absolute bottom-4 left-1/2 -translate-x-1/2 transition-all duration-500 ease-out z-50
        ${(leftSelectedField && rightSelectedField && matchType) 
            ? 'opacity-100 translate-y-0 scale-100' 
            : 'opacity-0 translate-y-10 scale-95 pointer-events-none'
        }
      `}>
        <button 
          onClick={handleSave}
          disabled={isSaving}
          className="group flex items-center justify-center gap-3 px-8 py-4 bg-[#3b2a21] text-white rounded-full shadow-[0_10px_40px_-10px_rgba(59,42,33,0.5)] font-bold tracking-wide disabled:opacity-80 disabled:hover:scale-100
          
          /* THE BLUR FIX: Added GPU acceleration and anti-aliasing */
          transition-all duration-300 hover:scale-105 transform-gpu will-change-transform backface-hidden antialiased"
        >
          {isSaving ? (
             <>
               <Loader2 size={18} className="animate-spin" />
               <span>Saving Configuration...</span>
             </>
          ) : (
            <>
              <span>Save Rule Configuration</span>
              <CornerDownRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default RuleCanvas;