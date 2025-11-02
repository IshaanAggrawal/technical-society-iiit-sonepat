import { useState, useEffect } from 'react';

interface FloatingActionButtonProps {
  onReset: () => void;
  onFullscreen: () => void;
  onToggleLock?: () => void;
  isLocked?: boolean;
}

export function FloatingActionButton({ onReset, onFullscreen, onToggleLock, isLocked = false }: FloatingActionButtonProps) {
  const [isOpen, setIsOpen] = useState(false);

  // Close the menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (isOpen && !target.closest('.floating-action-button')) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const actions = [
    {
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
      ),
      label: 'Reset View',
      onClick: onReset,
      color: 'from-cyan-500 to-blue-500',
      glow: 'rgba(6, 182, 212, 0.5)'
    },
    {
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
        </svg>
      ),
      label: 'Fullscreen',
      onClick: onFullscreen,
      color: 'from-purple-500 to-pink-500',
      glow: 'rgba(168, 85, 247, 0.5)'
    },
    ...(onToggleLock ? [{
      icon: isLocked ? (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
      ) : (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z" />
        </svg>
      ),
      label: isLocked ? 'Unlock Pan' : 'Lock Pan',
      onClick: onToggleLock,
      color: isLocked ? 'from-orange-500 to-red-500' : 'from-yellow-500 to-orange-500',
      glow: isLocked ? 'rgba(239, 68, 68, 0.5)' : 'rgba(234, 179, 8, 0.5)'
    }] : [])
  ];

  return (
    <div className="floating-action-button fixed bottom-6 right-6 z-50 flex flex-col-reverse items-center gap-3">
      {/* Main toggle button - at bottom */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-500 rounded-xl shadow-lg hover:shadow-2xl transform hover:scale-110 transition-all duration-300 flex items-center justify-center text-white border-2 border-white/30 backdrop-blur-sm"
        style={{
          boxShadow: '0 8px 20px rgba(16, 185, 129, 0.6), 0 0 0 1px rgba(255, 255, 255, 0.1)',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
        }}
      >
        <svg className={`w-7 h-7 transition-transform duration-300 ${isOpen ? 'rotate-45' : 'rotate-0'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
      </button>

      {/* Action buttons - open above main button */}
      {actions.map((action, index) => (
        <button
          key={index}
          onClick={() => {
            action.onClick();
            if (action.label !== 'Lock Pan' && action.label !== 'Unlock Pan') {
              setIsOpen(false);
            }
          }}
          className={`
            group relative w-13 h-13 bg-gradient-to-br ${action.color} 
            rounded-xl shadow-lg hover:shadow-2xl transform hover:scale-110 
            transition-all duration-300 flex items-center justify-center text-white
            border-2 border-white/30 backdrop-blur-sm
            ${
              isOpen
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-4 pointer-events-none'
            }
          `}
          style={{
            boxShadow: `0 6px 16px ${action.glow}, 0 0 0 1px rgba(255, 255, 255, 0.1)`,
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            transitionDelay: isOpen ? `${index * 60}ms` : '0ms'
          }}
          title={action.label}
        >
          <div className="absolute inset-0 rounded-xl bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
          
          {action.icon}
          <div className="absolute right-16 bg-black/95 text-white px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none z-50 border border-white/30 backdrop-blur-md shadow-xl">
            {action.label}
            <div className="absolute right-[-6px] top-1/2 transform -translate-y-1/2 w-0 h-0 border-t-[6px] border-b-[6px] border-l-[6px] border-t-transparent border-b-transparent border-l-black/95"></div>
          </div>
        </button>
      ))}
    </div>
  );
}