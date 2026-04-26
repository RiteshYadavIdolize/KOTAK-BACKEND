// src/features/RuleBuilder/components/RuleMetadataModal.jsx
import React, { useState } from 'react';
import { X, Save, FileText } from 'lucide-react';

// 1. THE FIX: Move InputField OUTSIDE the main component!
// Now React knows this is a permanent component and won't destroy it on every keystroke.
const InputField = ({ label, name, value, onChange, placeholder, isTextArea = false }) => (
  <div className="flex flex-col gap-1.5 shrink-0">
    <label className="text-[10px] font-bold text-[#7a6458] dark:text-slate-400 uppercase tracking-widest pl-1">
      {label}
    </label>
    {isTextArea ? (
      <textarea
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        rows="3"
        className="w-full bg-white/50 dark:bg-zinc-800/50 border border-white/60 dark:border-zinc-700 rounded-xl px-4 py-3 text-sm text-[#3b2a21] dark:text-white placeholder:text-[#cbb09d] dark:placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-[#cbb09d]/50 dark:focus:ring-zinc-500 transition-all custom-scrollbar resize-none"
        required
      />
    ) : (
      <input
        type="text"
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full bg-white/50 dark:bg-zinc-800/50 border border-white/60 dark:border-zinc-700 rounded-xl px-4 py-3 text-sm text-[#3b2a21] dark:text-white placeholder:text-[#cbb09d] dark:placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-[#cbb09d]/50 dark:focus:ring-zinc-500 transition-all"
        required
      />
    )}
  </div>
);

const RuleMetadataModal = ({ isOpen, onClose, onSubmit, selectedConfig }) => {
  const [formData, setFormData] = useState({
    SL_Conditions_No: '',
    Checklist_Sr_No: '',
    Sanction_conditions: '',
    Rule_Number: '',
    Validation_Rule: '',
    Rule_Description: ''
  });

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8">
      
      {/* Blurred Backdrop */}
      <div 
        className="absolute inset-0 bg-black/20 dark:bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      ></div>

      <form 
        onSubmit={handleSubmit} 
        className="relative w-full max-w-3xl max-h-full bg-white/70 dark:bg-zinc-900/80 backdrop-blur-2xl border border-white/80 dark:border-zinc-700 rounded-[2rem] shadow-2xl flex flex-col animate-in fade-in zoom-in-95 duration-300"
      >
        
        {/* HEADER */}
        <div className="shrink-0 px-8 py-6 border-b border-white/50 dark:border-zinc-800 flex items-center justify-between bg-white/30 dark:bg-zinc-800/30">
          <div>
            <h2 className="text-xl font-bold text-[#3b2a21] dark:text-white flex items-center gap-2">
              <FileText className="text-[#cbb09d] dark:text-slate-400" size={20} />
              Finalize Rule Metadata
            </h2>
            <p className="text-xs text-[#7a6458] dark:text-slate-400 mt-1">
              Mapping: <span className="font-semibold text-[#3b2a21] dark:text-slate-200">{selectedConfig?.source}</span> → <span className="font-semibold text-[#3b2a21] dark:text-slate-200">{selectedConfig?.target}</span> ({selectedConfig?.strategy})
            </p>
          </div>
          <button 
            type="button"
            onClick={onClose}
            className="p-2 bg-white/50 dark:bg-zinc-800 hover:bg-white/80 dark:hover:bg-zinc-700 rounded-full transition-colors text-[#7a6458] dark:text-slate-400"
          >
            <X size={20} />
          </button>
        </div>

        {/* BODY */}
        <div className="flex-1 overflow-y-auto p-8 custom-scrollbar flex flex-col gap-6">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* 2. pass value and onChange explicitly down to the inputs */}
            <InputField label="Condition Number" name="SL_Conditions_No" value={formData.SL_Conditions_No} onChange={handleChange} placeholder="e.g., Condition-1" />
            <InputField label="Checklist Sr. No" name="Checklist_Sr_No" value={formData.Checklist_Sr_No} onChange={handleChange} placeholder="e.g., LIMITSL-A-001" />
            <InputField label="Rule Number" name="Rule_Number" value={formData.Rule_Number} onChange={handleChange} placeholder="e.g., LIMITSL-A-001-R01" />
            <InputField label="Validation Rule" name="Validation_Rule" value={formData.Validation_Rule} onChange={handleChange} placeholder="e.g., 1. Sanction Letter required on LH of bank" />
          </div>

          <InputField 
            label="Sanction Conditions" 
            name="Sanction_conditions" 
            value={formData.Sanction_conditions} 
            onChange={handleChange}
            placeholder="e.g., Verification of Sanction Letter Validity..." 
            isTextArea={true} 
          />

          <InputField 
            label="Rule Description" 
            name="Rule_Description" 
            value={formData.Rule_Description} 
            onChange={handleChange}
            placeholder="e.g., On first page KMBL Logo and Kmbl Name should be Visible" 
            isTextArea={true} 
          />
        </div>

        {/* FOOTER */}
        <div className="shrink-0 px-8 py-5 border-t border-white/50 dark:border-zinc-800 bg-white/30 dark:bg-zinc-800/30 flex justify-end gap-3">
          <button 
            type="button"
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl font-semibold text-[#7a6458] dark:text-slate-300 hover:bg-white/50 dark:hover:bg-zinc-700 transition-colors text-sm"
          >
            Cancel
          </button>
          <button 
            type="submit"
            className="px-8 py-2.5 rounded-xl font-bold bg-[#3b2a21] dark:bg-slate-100 text-white dark:text-zinc-900 shadow-md hover:scale-105 transition-all text-sm flex items-center gap-2"
          >
            <Save size={16} />
            Confirm & Save Rule
          </button>
        </div>

      </form>
    </div>
  );
};

export default RuleMetadataModal;