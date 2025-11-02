import { useState } from 'react';
import { Handle, Position } from '@xyflow/react';
import { CustomNodeData } from '@/lib/roadmaps/types';

interface CustomNodeProps {
  data?: CustomNodeData;
  selected?: boolean;
}

export function CustomNode({ data, selected }: CustomNodeProps) {
  const [isHovered, setIsHovered] = useState(false);

  if (!data) {
    return (
      <div className="rounded-xl bg-red-500/20 border border-red-500/50 p-2 text-center">
        <div className="text-red-400 text-xs">Error: Missing node data</div>
      </div>
    );
  }

  const bgColor = data.color || '#22c55e';
  const borderColor = data.borderColor || '#16a34a';

  return (
    <div 
      className="relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div 
        className={`relative rounded-xl flex items-center justify-center text-center font-bold text-white shadow-lg transition-all duration-300 ${
          isHovered ? 'scale-110' : 'scale-100'
        } ${selected ? 'ring-2 ring-white/50' : ''}`}
        style={{
          background: `linear-gradient(135deg, ${bgColor}, ${bgColor}dd)`,
          border: `2px solid ${borderColor}`,
          boxShadow: isHovered 
            ? `0 8px 25px ${bgColor}80, 0 0 20px ${bgColor}60`
            : `0 4px 12px ${bgColor}60`,
          minWidth: '140px',
          minHeight: '50px',
          padding: '8px 12px',
        }}
      >
        <Handle 
          type="target" 
          position={Position.Top} 
          className="w-2 h-2 bg-gray-800 border-2 !border-white/30"
        />

        <div className="text-sm font-semibold drop-shadow-md">
          {data.label}
        </div>

        <Handle 
          type="source" 
          position={Position.Bottom} 
          className="w-2 h-2 bg-gray-800 border-2 !border-white/30"
        />
      </div>

      {isHovered && (
        <div 
          className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 bg-gray-900/95 backdrop-blur-sm border rounded-lg py-2 px-3 shadow-xl z-50 min-w-[200px] max-w-[280px]"
          style={{
            borderColor: borderColor,
            boxShadow: `0 10px 30px ${bgColor}40`
          }}
        >
          <div className="font-bold text-sm mb-1" style={{ color: bgColor }}>
            {data.label}
          </div>
          
          {data.description && (
            <div className="text-gray-300 text-xs mb-2 leading-relaxed">
              {data.description}
            </div>
          )}
          
          <div className="flex items-center justify-between gap-2 pt-1.5 border-t border-gray-700/50">
            {data.level && (
              <div className="flex items-center gap-1">
                <span className="text-[10px] text-gray-400">Level:</span>
                <span className="text-[10px] font-semibold text-white">
                  {data.level}
                </span>
              </div>
            )}
            {data.duration && (
              <div className="flex items-center gap-1">
                <span className="text-[10px] text-gray-400">⏱</span>
                <span className="text-[10px] text-gray-300">{data.duration}</span>
              </div>
            )}
          </div>
          
          <div 
            className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-[6px] border-r-[6px] border-t-[6px] border-l-transparent border-r-transparent" 
            style={{ borderTopColor: borderColor }}
          />
        </div>
      )}
    </div>
  );
}
