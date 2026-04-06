import React from 'react';

const ActionCard = ({ title, description, onClick, accentColor, bgHover, iconSvg }) => {
  return (
    <button
      onClick={onClick}
      className={`group relative w-full h-full min-h-[320px] flex flex-col justify-between p-10 bg-white/80 backdrop-blur-xl rounded-[2rem] border border-white shadow-lg hover:shadow-2xl transition-all duration-500 ease-out transform hover:-translate-y-2 text-left overflow-hidden focus:outline-none focus:ring-4 focus:ring-slate-200 ${bgHover}`}
    >
      {/* Background radial gradient on hover for a premium glow */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 bg-gradient-to-br from-current to-transparent pointer-events-none"></div>

      <div className="relative z-10">
        {/* Icon Container with smooth scale and background shift */}
        <div className={`inline-flex items-center justify-center w-20 h-20 mb-8 rounded-2xl bg-slate-50 text-slate-700 group-hover:text-white group-hover:scale-110 ${accentColor} transition-all duration-500 shadow-sm group-hover:shadow-md`}>
          {iconSvg}
        </div>

        {/* Typography */}
        <h2 className="text-3xl font-bold text-slate-800 mb-4 tracking-tight group-hover:text-slate-900 transition-colors">
          {title}
        </h2>
        <p className="text-slate-500 text-base leading-relaxed group-hover:text-slate-700 transition-colors">
          {description}
        </p>
      </div>

      {/* An animated subtle arrow that appears on hover to prompt action */}
      <div className="absolute bottom-10 right-10 opacity-0 transform translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500 text-slate-400 group-hover:text-slate-800">
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
        </svg>
      </div>
    </button>
  );
};

export default ActionCard;