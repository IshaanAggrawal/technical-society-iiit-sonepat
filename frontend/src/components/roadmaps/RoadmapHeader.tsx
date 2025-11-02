import { RoadmapTab } from '@/lib/roadmaps/types';

interface RoadmapHeaderProps {
  currentTab: RoadmapTab | undefined;
  onMobileMenuToggle?: () => void;
}

export function RoadmapHeader({ currentTab, onMobileMenuToggle }: RoadmapHeaderProps) {
  if (!currentTab) return null;

  // Get color based on tab
  const getTabColor = () => {
    switch (currentTab.id) {
      case 'ai': return 'from-purple-500 to-pink-500';
      case 'dsa': return 'from-blue-500 to-cyan-500';
      case 'webdev': return 'from-green-500 to-teal-500';
      default: return 'from-primary to-green-500';
    }
  };

  const getTabGlowColor = () => {
    switch (currentTab.id) {
      case 'ai': return 'rgba(168, 85, 247, 0.6)';
      case 'dsa': return 'rgba(59, 130, 246, 0.6)';
      case 'webdev': return 'rgba(34, 197, 94, 0.6)';
      default: return 'rgba(34, 197, 94, 0.6)';
    }
  };

  return (
    <div className="glassmorphism-header bg-black/80 backdrop-blur-xl border-b border-border px-4 lg:px-6 py-3 lg:py-4 relative">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <button
            onClick={onMobileMenuToggle}
            className="lg:hidden p-2 rounded-lg text-muted-foreground hover:text-foreground transition-all duration-200 hover:bg-muted -ml-2"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
      
      <div className="mt-3 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="relative">
            <span className="text-2xl lg:text-3xl animate-float">{currentTab.icon}</span>
            <div 
              className="absolute -inset-1 rounded-full opacity-40 animate-ping"
              style={{ 
                background: `radial-gradient(circle, ${getTabGlowColor()}, transparent 70%)` 
              }}
            ></div>
          </div>
          <div>
            <h2 className="text-lg lg:text-xl font-bold text-foreground">
              <span className={`bg-clip-text text-transparent bg-gradient-to-r ${getTabColor()}`}>
                {currentTab.label} Roadmap
              </span>
            </h2>
            <p className="text-xs lg:text-sm text-muted-foreground/80 hidden sm:block">
              Follow this path to master {currentTab.label.toLowerCase()}
            </p>
          </div>
        </div>
      </div>
      
      <div 
        className="absolute bottom-0 left-0 right-0 h-0.5 shimmer-effect"
        style={{ 
          background: `linear-gradient(90deg, transparent, ${getTabGlowColor()}, transparent)` 
        }}
      ></div>
    </div>
  );
}
