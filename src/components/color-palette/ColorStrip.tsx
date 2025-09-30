import { useState } from 'react';
import type { ColorInfo } from '../../types';
import { copyToClipboard } from '../../utils/colorUtils';

interface ColorStripProps {
  color: ColorInfo;
  onToggleLock: (colorId: string) => void;
}

export function ColorStrip({ color, onToggleLock }: ColorStripProps) {
  const [copied, setCopied] = useState(false);

  const handleCopyColor = async (colorValue: string) => {
    const success = await copyToClipboard(colorValue);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div 
      className="relative flex-1 h-full cursor-pointer group transition-all duration-200 hover:scale-105"
      style={{ backgroundColor: color.hex }}
      onClick={() => onToggleLock(color.id)}
    >
      {/* Lock indicator */}
      <div className="absolute top-4 left-4">
        {color.isLocked ? (
          <svg className="w-6 h-6 text-white drop-shadow-lg" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
          </svg>
        ) : (
          <svg className="w-6 h-6 text-white/70 opacity-0 group-hover:opacity-100 transition-opacity drop-shadow-lg" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 2a5 5 0 00-5 5v2a2 2 0 00-2 2v5a2 2 0 002 2h10a2 2 0 002-2v-5a2 2 0 00-2-2H7V7a3 3 0 015.905-.75 1 1 0 001.937-.5A5.002 5.002 0 0010 2z" />
          </svg>
        )}
      </div>

      {/* Color information overlay */}
      <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
        <div className="bg-black/80 backdrop-blur-sm rounded-lg p-3 text-white text-sm">
          <div className="space-y-1">
            <button
              className="block w-full text-left hover:bg-white/10 p-1 rounded transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                handleCopyColor(color.oklch);
              }}
            >
              <span className="font-mono">{color.oklch}</span>
            </button>
            <button
              className="block w-full text-left hover:bg-white/10 p-1 rounded transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                handleCopyColor(color.hex);
              }}
            >
              <span className="font-mono">{color.hex}</span>
            </button>
          </div>
          {copied && (
            <div className="mt-2 text-xs text-green-300">
              Copied to clipboard!
            </div>
          )}
        </div>
      </div>

      {/* Click instruction */}
      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
        <div className="bg-black/60 backdrop-blur-sm rounded-full px-4 py-2 text-white text-sm">
          Click to {color.isLocked ? 'unlock' : 'lock'}
        </div>
      </div>
    </div>
  );
}