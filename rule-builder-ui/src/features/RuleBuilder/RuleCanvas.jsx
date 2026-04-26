// src/features/RuleBuilder/RuleCanvas.jsx
import React, { useState, useEffect } from 'react';
import { CornerDownRight, Loader2 } from 'lucide-react';
import DocumentColumn from './components/DocumentColumn';
import MatchStrategy from './components/MatchStrategy';
import RuleMetadataModal from './components/RuleMetadataModal';

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

  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchDocs = async () => {
      try {
        setIsLoadingDocs(true);
        const response = await fetch('http://localhost:3000/api/documents'); 
        if (!response.ok) throw new Error('Fetch failed');
        const data = await response.json();
        setDocuments(data.success && Array.isArray(data.data) ? data.data : data);
      } catch (err) {
        console.error(err);
        setDocuments([{ ID: 1, Name: 'Aadhaar Consent' }, { ID: 2, Name: 'PAN Card' }]);
      } finally {
        setIsLoadingDocs(false);
      }
    };
    fetchDocs();
  }, []);

  const handleSelectDoc = async (side, doc) => {
    if (side === 'left') {
      setLeftDoc(doc); setLeftSelectedField(null);
      if (!doc) return; setIsLeftLoading(true);
    } else {
      setRightDoc(doc); setRightSelectedField(null);
      if (!doc) return; setIsRightLoading(true);
    }

    try {
      const response = await fetch(`http://localhost:3000/api/documents/${doc.ID}/fields`);
      if (!response.ok) throw new Error('Fetch fields failed');
      const data = await response.json();
      const fields = data.success && Array.isArray(data.data) ? data.data : data;
      side === 'left' ? setLeftFields(fields) : setRightFields(fields);
    } catch (err) {
      console.error(err);
      const mockFields = [{ id: 16, Field_Name: 'Name_As_Per_Aadhaar' }, { id: 17, Field_Name: 'Email_ID' }, { id: 18, Field_Name: 'Mobile_Number' }];
      side === 'left' ? setLeftFields(mockFields) : setRightFields(mockFields);
    } finally {
      side === 'left' ? setIsLeftLoading(false) : setIsRightLoading(false);
    }
  };

  // This now just OPENS the modal
  const handleSave = () => {
    setIsModalOpen(true);
  };

  // <-- ADD THIS NEW FUNCTION to handle the final submission from the modal
  const handleFinalSubmit = async (metadata) => {
    setIsModalOpen(false);
    setIsSaving(true);
    
    // Here is where you combine everything into the final payload!
    const finalPayload = {
        // From the visual canvas mapping
        Source_1: `${leftDoc.Name} >> ${leftSelectedField.Field_Name}`,
        Match_Operator: matchType,
        Source_2: `${rightDoc.Name} >> ${rightSelectedField.Field_Name}`,
        
        // From the popup modal form
        ...metadata
    };

    console.log("FINAL PAYLOAD FOR DATABASE:", finalPayload);

    // Simulate API Call
    await new Promise(res => setTimeout(res, 1200));
    alert('Rule saved successfully! Check console for payload.');
    
    setIsSaving(false);
    
    // Optional: Reset UI
    // setLeftSelectedField(null); setRightSelectedField(null); setMatchType(null);
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-start relative min-h-0">
      
      {/* THE LAYOUT FIX: Strict Grid layout forces perfect vertical centering and column widths */}
      {/* CHANGED: Reduced pb-20 to pb-14 and reduced the gap between columns slightly to maximize space */}
      <div className="w-full h-full flex-1 grid grid-cols-1 lg:grid-cols-[1fr_180px_1fr] gap-4 overflow-hidden min-h-0 pb-14">
        
        {/* Left Column */}
        <div className="w-full h-full min-h-0">
          <DocumentColumn 
            title="Source"
            documents={documents} isLoadingDocs={isLoadingDocs}
            selectedDoc={leftDoc} fields={leftFields} selectedField={leftSelectedField} isLoadingFields={isLeftLoading}
            onSelectDoc={(doc) => handleSelectDoc('left', doc)}
            onSelectField={(field) => setLeftSelectedField(field)}
          />
        </div>

        {/* Center Column - perfectly centered using flex-col and justify-center */}
        <div className="flex flex-col items-center justify-center h-full relative z-10 w-full shrink-0">
          <MatchStrategy matchType={matchType} setMatchType={setMatchType} />
          {/* We only keep tiny connector lines strictly behind the center box, no global background line! */}
          {(leftSelectedField || rightSelectedField) && (
             <div className="absolute top-1/2 left-[-15px] right-[-15px] h-[2px] bg-[#cbb09d]/40 -z-10 rounded-full"></div>
          )}
        </div>

        {/* Right Column */}
        <div className="w-full h-full min-h-0">
          <DocumentColumn 
            title="Target"
            documents={documents} isLoadingDocs={isLoadingDocs}
            selectedDoc={rightDoc} fields={rightFields} selectedField={rightSelectedField} isLoadingFields={isRightLoading}
            onSelectDoc={(doc) => handleSelectDoc('right', doc)}
            onSelectField={(field) => setRightSelectedField(field)}
          />
        </div>
      </div>

      {/* Floating Save Button */}
      <div className={`absolute bottom-4 left-1/2 -translate-x-1/2 transition-all duration-500 ease-out z-50 ${(leftSelectedField && rightSelectedField && matchType) ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-10 scale-95 pointer-events-none'}`}>
        <button onClick={handleSave} disabled={isSaving} className="group flex items-center justify-center gap-3 px-8 py-4 bg-[#3b2a21] text-white rounded-full shadow-[0_10px_40px_-10px_rgba(59,42,33,0.5)] hover:scale-105 transition-all duration-300 font-bold tracking-wide disabled:opacity-80 disabled:hover:scale-100">
          {isSaving ? (
             <><Loader2 size={18} className="animate-spin" /><span>Saving Configuration...</span></>
          ) : (
            <><span>Save Rule Configuration</span><CornerDownRight size={18} className="group-hover:translate-x-1 transition-transform" /></>
          )}
        </button>
      </div>
    {/* Floating Save Button */}
      <div className={`absolute bottom-4 left-1/2 -translate-x-1/2 transition-all duration-500 ease-out z-50 ${(leftSelectedField && rightSelectedField && matchType) ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-10 scale-95 pointer-events-none'}`}>
        <button onClick={handleSave} disabled={isSaving} className="group flex items-center justify-center gap-3 px-8 py-4 bg-[#3b2a21] text-white rounded-full shadow-[0_10px_40px_-10px_rgba(59,42,33,0.5)] font-bold tracking-wide disabled:opacity-80 disabled:hover:scale-100 transition-all duration-300 hover:scale-105 transform-gpu will-change-transform backface-hidden antialiased">
          {isSaving ? (
             <><Loader2 size={18} className="animate-spin" /><span>Saving Configuration...</span></>
          ) : (
            <><span>Save Rule Configuration</span><CornerDownRight size={18} className="group-hover:translate-x-1 transition-transform" /></>
          )}
        </button>
      </div>

      {/* <-- ADD THE MODAL COMPONENT HERE --> */}
      <RuleMetadataModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleFinalSubmit}
        selectedConfig={{
          source: leftDoc && leftSelectedField ? `${leftDoc.Name} >> ${leftSelectedField.Field_Name}` : '',
          target: rightDoc && rightSelectedField ? `${rightDoc.Name} >> ${rightSelectedField.Field_Name}` : '',
          strategy: matchType || ''
        }}
      />
      
    </div>
  );
};
export default RuleCanvas;
