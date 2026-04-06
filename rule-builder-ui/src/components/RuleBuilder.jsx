import React from 'react';

const RuleBuilder = () => {
  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
        
        {/* Header Section */}
        <div className="bg-blue-800 p-6">
          <h1 className="text-2xl font-bold text-white">Rule Master Builder</h1>
          <p className="text-blue-200 text-sm mt-1">Configure validation rules for document extraction seamlessly.</p>
        </div>

        {/* Form Section */}
        <div className="p-8 space-y-6">
          
          {/* Top Row: Basic Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Checklist Reference</label>
              <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all">
                <option>LIMITSL-A-001 (Sanction Letter)</option>
                <option>AADHAAR-C1 (Aadhaar Consent)</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Rule Number</label>
              <input type="text" placeholder="e.g., LIMITSL-A-001-R01" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all" />
            </div>
          </div>

          {/* Logic Row: Source and Operator */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-gray-50 p-6 rounded-lg border border-gray-200">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Source 1</label>
              <select className="w-full p-3 border border-gray-300 rounded-lg outline-none">
                <option>SL &gt;&gt; Presence Check</option>
                <option>SL &gt;&gt; Ref. No</option>
                <option>SL &gt;&gt; Date</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Match Operator</label>
              <select className="w-full p-3 border border-gray-300 rounded-lg outline-none">
                <option>Unique</option>
                <option>Exact Match</option>
                <option>Contains</option>
                <option>Greater Than</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Source 2</label>
              <select className="w-full p-3 border border-gray-300 rounded-lg outline-none">
                <option>None (Single Source Check)</option>
                <option>CLOS &gt;&gt; Reference Number</option>
                <option>SL &gt;&gt; Authorized Signatories Date</option>
              </select>
            </div>
          </div>

          {/* Description Row */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Validation Rule Description</label>
            <textarea 
              rows="3" 
              placeholder="Describe what this rule does..."
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
            ></textarea>
          </div>

          {/* Submit Button */}
          <div className="pt-4 flex justify-end">
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg shadow-sm transition-colors">
              Generate & Save Rule
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default RuleBuilder;