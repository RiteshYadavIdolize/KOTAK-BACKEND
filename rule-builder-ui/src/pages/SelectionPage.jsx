import React from 'react';
import ActionCard from '../components/common/ActionCard';

const SelectionPage = ({ onSelectMode }) => {
  const insertIcon = (
    <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4v16m8-8H4" />
    </svg>
  );

  const updateIcon = (
    <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
    </svg>
  );

  return (
    // 1. Removed items-center and justify-center. Added flex-col so it stacks top-to-bottom.
    <div className="relative min-h-screen bg-slate-50 flex flex-col overflow-hidden font-sans selection:bg-blue-200">
      
      {/* Ambient Background Glows */}
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[60%] rounded-full bg-blue-400/20 blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[60%] rounded-full bg-emerald-400/20 blur-[120px] pointer-events-none"></div>

      {/* 2. Removed max-w-7xl and justify-center. Added flex-1 so this container fills the whole screen height. */}
      <div className="relative z-10 w-full flex-1 flex flex-col px-6 py-12 md:px-12 md:py-16">
        
        {/* Header Section */}
        <div className="mb-12">
          <h2 className="text-blue-600 font-semibold tracking-wider uppercase text-sm mb-3">Document Intelligence Engine</h2>
          <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 tracking-tight mb-6 leading-tight">
            Configure <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-emerald-500">
              Rule Workflows.
            </span>
          </h1>
          <p className="text-xl text-slate-500 max-w-2xl leading-relaxed">
            Select an action to manage your extraction logic. Changes sync instantly with your database.
          </p>
        </div>

        {/* 3. Added flex-1 to the grid so the cards stretch down to fill the rest of the page. */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 w-full flex-1">
          <ActionCard
            title="Create New Rule"
            description="Initialize a brand new validation sequence. Define sources, match operators, and map logic to your established checklists."
            accentColor="group-hover:bg-blue-600"
            bgHover="hover:border-blue-200"
            iconSvg={insertIcon}
            onClick={() => onSelectMode('insert')}
          />
          
          <ActionCard
            title="Update Existing"
            description="Modify active parameters. Adjust specific validation scripts, change source dependencies, or toggle rule statuses dynamically."
            accentColor="group-hover:bg-emerald-500"
            bgHover="hover:border-emerald-200"
            iconSvg={updateIcon}
            onClick={() => onSelectMode('update')}
          />
        </div>

      </div>
    </div>
  );
};

export default SelectionPage;