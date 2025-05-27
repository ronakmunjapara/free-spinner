
import { Card, CardContent } from '@/components/ui/card';
import { useEffect, useState } from 'react';

interface WinnerDisplayProps {
  winner: string | null;
}

const WinnerDisplay = ({ winner }: WinnerDisplayProps) => {
  const [showConfetti, setShowConfetti] = useState(false);
  const [showWinner, setShowWinner] = useState(false);

  useEffect(() => {
    if (winner) {
      setShowConfetti(true);
      setTimeout(() => setShowWinner(true), 300);
      
      // Reset confetti after animation
      setTimeout(() => setShowConfetti(false), 3000);
    } else {
      setShowWinner(false);
      setShowConfetti(false);
    }
  }, [winner]);

  const confettiElements = Array.from({ length: 50 }, (_, i) => (
    <div
      key={i}
      className={`absolute w-2 h-2 ${
        ['bg-yellow-400', 'bg-red-400', 'bg-blue-400', 'bg-green-400', 'bg-purple-400', 'bg-pink-400'][i % 6]
      } ${showConfetti ? 'animate-bounce' : ''}`}
      style={{
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        animationDelay: `${Math.random() * 2}s`,
        animationDuration: `${1 + Math.random() * 2}s`,
        transform: `rotate(${Math.random() * 360}deg)`,
      }}
    />
  ));

  return (
    <Card className={`transition-all duration-500 relative overflow-hidden ${
      winner 
        ? 'bg-gradient-to-r from-yellow-100 via-orange-100 to-red-100 border-yellow-300' 
        : 'bg-gray-50'
    }`}>
      <CardContent className="p-8 text-center relative">
        {/* Confetti Effect */}
        {showConfetti && (
          <div className="absolute inset-0 pointer-events-none z-10">
            {confettiElements}
          </div>
        )}

        {winner ? (
          <div className={`transform transition-all duration-700 ${
            showWinner ? 'scale-100 opacity-100' : 'scale-50 opacity-0'
          }`}>
            {/* Animated Trophy */}
            <div className="text-8xl mb-4 animate-bounce">🏆</div>
            
            {/* Fireworks Emojis */}
            <div className="flex justify-center space-x-4 mb-4">
              <span className="text-4xl animate-pulse">🎆</span>
              <span className="text-4xl animate-pulse" style={{ animationDelay: '0.5s' }}>🎇</span>
              <span className="text-4xl animate-pulse" style={{ animationDelay: '1s' }}>🎉</span>
            </div>

            {/* Winner Announcement */}
            <div className="mb-6">
              <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-600 to-red-600 mb-2 font-poppins animate-pulse">
                🎊 WINNER! 🎊
              </h2>
              <div className="relative">
                <p className="text-4xl font-bold text-orange-600 mb-4 drop-shadow-lg transform hover:scale-110 transition-transform duration-300">
                  {winner}
                </p>
                {/* Glowing effect */}
                <div className="absolute inset-0 text-4xl font-bold text-orange-600 blur-sm opacity-50">
                  {winner}
                </div>
              </div>
            </div>

            {/* Celebration Message */}
            <div className="space-y-2">
              <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-yellow-200 to-orange-200 text-orange-800 rounded-full font-bold text-lg shadow-lg transform hover:scale-105 transition-transform">
                🥳 Congratulations! 🥳
              </div>
              <div className="text-sm text-gray-600 mt-2 animate-fade-in">
                You are the lucky winner! 🍀
              </div>
            </div>

            {/* Sparkle Animation */}
            <div className="absolute top-4 right-4 text-2xl animate-spin">✨</div>
            <div className="absolute top-8 left-4 text-xl animate-ping">⭐</div>
            <div className="absolute bottom-4 right-8 text-lg animate-pulse">💫</div>
          </div>
        ) : (
          <div className="py-12">
            <div className="text-6xl mb-4 opacity-30 animate-pulse">🎯</div>
            <h2 className="text-2xl font-semibold text-gray-500 mb-2">
              Ready to Spin?
            </h2>
            <p className="text-gray-400">
              The winner will appear here after spinning the wheel.
            </p>
            <div className="mt-4 text-sm text-gray-400">
              Good luck to everyone! 🍀
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default WinnerDisplay;
