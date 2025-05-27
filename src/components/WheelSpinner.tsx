import { forwardRef, useImperativeHandle, useState, useRef, useCallback } from 'react';
import { SpinnerSettings } from '@/pages/Index';

interface WheelSpinnerProps {
  names: string[];
  settings: SpinnerSettings;
  onSpinComplete: (winner: string) => void;
  isSpinning: boolean;
}

export interface WheelSpinnerRef {
  spin: () => void;
}

const WheelSpinner = forwardRef<WheelSpinnerRef, WheelSpinnerProps>(
  ({ names, settings, onSpinComplete, isSpinning }, ref) => {
    const [rotation, setRotation] = useState(0);
    const wheelRef = useRef<HTMLDivElement>(null);
    const spinTimeoutRef = useRef<NodeJS.Timeout>();
    const spinSoundRef = useRef<HTMLAudioElement | null>(null);
    const winSoundRef = useRef<HTMLAudioElement | null>(null);

    // Initialize sound effects
    const initializeSounds = useCallback(() => {
      if (!spinSoundRef.current) {
        spinSoundRef.current = new Audio();
        spinSoundRef.current.src = 'data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhEkGw6tGHNAcXZ7Tt3qFLEwxOqeXtt2ceBUqw6dOPOAMWY7Pr4qhWFAxBng==';
        spinSoundRef.current.volume = 0.3;
        spinSoundRef.current.loop = true;
      }
      
      if (!winSoundRef.current) {
        winSoundRef.current = new Audio();
        winSoundRef.current.src = 'data:audio/wav;base64,UklGRvoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhEkGw6tGHNAcXZ7Tt3qFLEwxOqeXtt2ceBUqw6dOPOAMWY7Pr4qhWFAxBng==';
        winSoundRef.current.volume = 0.5;
      }
    }, []);

    const spin = useCallback(() => {
      if (names.length === 0) return;

      initializeSounds();

      // Clear any existing timeout
      if (spinTimeoutRef.current) {
        clearTimeout(spinTimeoutRef.current);
      }

      // Play spinning sound
      if (spinSoundRef.current) {
        spinSoundRef.current.currentTime = 0;
        spinSoundRef.current.play().catch(() => {
          // Ignore audio play errors (user interaction required)
        });
      }

      const segmentAngle = 360 / names.length;
      const spins = 5 + Math.random() * 5; // 5-10 full rotations
      const randomAngle = Math.random() * 360;
      const finalRotation = rotation + spins * 360 + randomAngle;

      setRotation(finalRotation);

      // Call onSpinComplete after animation finishes
      spinTimeoutRef.current = setTimeout(() => {
        // Stop spinning sound
        if (spinSoundRef.current) {
          spinSoundRef.current.pause();
          spinSoundRef.current.currentTime = 0;
        }

        // Calculate which segment the top pointer is pointing to
        const normalizedAngle = (360 - (finalRotation % 360)) % 360;
        const winnerIndex = Math.floor(normalizedAngle / segmentAngle) % names.length;
        
        // Play winner sound
        if (winSoundRef.current) {
          winSoundRef.current.currentTime = 0;
          winSoundRef.current.play().catch(() => {
            // Ignore audio play errors
          });
        }
        
        onSpinComplete(names[winnerIndex]);
      }, settings.spinDuration * 1000);
    }, [names, rotation, settings.spinDuration, onSpinComplete, initializeSounds]);

    useImperativeHandle(ref, () => ({ spin }), [spin]);

    if (names.length === 0) {
      return (
        <div className="w-80 h-80 flex items-center justify-center border-2 border-dashed border-gray-300 rounded-full bg-gray-50">
          <p className="text-gray-500 text-center px-8">
            Add some names to get started!
          </p>
        </div>
      );
    }

    const segmentAngle = 360 / names.length;

    return (
      <div className="relative w-80 h-80">
        {/* Wheel Container */}
        <div
          ref={wheelRef}
          className="w-full h-full rounded-full border-4 border-amber-600 shadow-2xl overflow-hidden relative"
          style={{
            transform: `rotate(${rotation}deg)`,
            transition: isSpinning ? `transform ${settings.spinDuration}s cubic-bezier(0.23, 1, 0.32, 1)` : 'none',
            fontFamily: settings.fontFamily
          }}
        >
          {/* Segments */}
          {names.map((name, index) => {
            const startAngle = index * segmentAngle;
            const color = settings.colorPalette[index % settings.colorPalette.length];
            const textColor = '#FFFFFF';
            
            return (
              <div
                key={`${name}-${index}`}
                className="absolute w-full h-full"
                style={{
                  background: `conic-gradient(from ${startAngle}deg, ${color} 0deg, ${color} ${segmentAngle}deg, transparent ${segmentAngle}deg)`,
                  clipPath: `polygon(50% 50%, ${50 + 50 * Math.cos((startAngle - 90) * Math.PI / 180)}% ${50 + 50 * Math.sin((startAngle - 90) * Math.PI / 180)}%, ${50 + 50 * Math.cos((startAngle + segmentAngle - 90) * Math.PI / 180)}% ${50 + 50 * Math.sin((startAngle + segmentAngle - 90) * Math.PI / 180)}%)`
                }}
              >
                <div
                  className="absolute inset-0 flex items-center justify-center"
                  style={{
                    transform: `rotate(${startAngle + segmentAngle / 2}deg)`,
                    transformOrigin: '50% 50%'
                  }}
                >
                  <span
                    className="font-bold text-white drop-shadow-lg text-center"
                    style={{
                      color: textColor,
                      fontSize: names.length > 12 ? '10px' : names.length > 8 ? '12px' : '14px',
                      textShadow: '2px 2px 4px rgba(0,0,0,0.7)',
                      transform: 'translateY(-80px)',
                      maxWidth: '80px',
                      lineHeight: '1.2',
                      wordBreak: 'break-word'
                    }}
                  >
                    {name.length > 12 ? `${name.substring(0, 12)}...` : name}
                  </span>
                </div>
              </div>
            );
          })}
          
          {/* Center Hub */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-amber-600 rounded-full border-4 border-amber-800 shadow-lg z-10 flex items-center justify-center">
            <div className="w-3 h-3 bg-white rounded-full"></div>
          </div>
        </div>

        {/* Pointer */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-2 z-20">
          <div className="w-0 h-0 border-l-4 border-r-4 border-b-8 border-l-transparent border-r-transparent border-b-red-600 drop-shadow-lg"></div>
        </div>
      </div>
    );
  }
);

WheelSpinner.displayName = 'WheelSpinner';

export default WheelSpinner;
