import { ColorStrip } from './ColorStrip';
import { useColorPalette } from '../../hooks/useColorPalette';

export function ColorPalette() {
  const { colors, toggleColorLock } = useColorPalette();

  return (
    <div className="flex h-1/2 w-full">
      {colors.map((color) => (
        <ColorStrip
          key={color.id}
          color={color}
          onToggleLock={toggleColorLock}
        />
      ))}
    </div>
  );
}