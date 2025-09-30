import { Button } from './Button';

interface ToolbarProps {
  onOpenThemeVisualizer: () => void;
  onRandomizeColors: () => void;
}

export function Toolbar({ onOpenThemeVisualizer, onRandomizeColors }: ToolbarProps) {
  return (
    <div className="absolute top-4 right-4 z-20 flex gap-2">
      <Button 
        variant="ghost" 
        size="sm"
        onClick={onRandomizeColors}
        className="bg-black/20 backdrop-blur-sm text-white border border-white/30 hover:bg-white/10"
      >
        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 002.574 6.64M4 20v-5h-.582m15.356-2a8.001 8.001 0 01-13.356 6.736" />
        </svg>
        Randomize
      </Button>
      
      <Button 
        variant="ghost" 
        size="sm"
        onClick={onOpenThemeVisualizer}
        className="bg-black/20 backdrop-blur-sm text-white border border-white/30 hover:bg-white/10"
      >
        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
        </svg>
        Preview Theme
      </Button>
    </div>
  );
}