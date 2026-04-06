// src/App.jsx
import React from 'react';
import SelectionPage from './pages/SelectionPage';

function App() {
  // We will build out the logic to switch to 'insert' or 'update' in the next step.
  // For now, it just logs your choice to the console.
  const handleModeSelection = (mode) => {
    console.log(`User selected: ${mode}`);
    // Future: setView(mode)
  };

  return (
    <SelectionPage onSelectMode={handleModeSelection} />
  );
}

export default App;