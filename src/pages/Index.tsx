
import { useState, useRef, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { toast } from '@/hooks/use-toast';
import WheelSpinner from '@/components/WheelSpinner';
import NameManager from '@/components/NameManager';
import CustomizationPanel from '@/components/CustomizationPanel';
import AdSpace from '@/components/AdSpace';
import WinnerDisplay from '@/components/WinnerDisplay';

export interface SpinnerSettings {
  colorPalette: string[];
  fontFamily: string;
  spinDuration: number;
}

const defaultSettings: SpinnerSettings = {
  colorPalette: ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', '#DDA0DD', '#98D8C8', '#F7DC6F'],
  fontFamily: 'Poppins',
  spinDuration: 4
};

const Index = () => {
  const [names, setNames] = useState<string[]>(['Alice', 'Bob', 'Charlie', 'Diana']);
  const [isSpinning, setIsSpinning] = useState(false);
  const [winner, setWinner] = useState<string | null>(null);
  const [settings, setSettings] = useState<SpinnerSettings>(defaultSettings);
  const wheelRef = useRef<{ spin: () => void } | null>(null);

  const handleSpin = useCallback(() => {
    if (names.length === 0) {
      toast({
        title: "No names to spin!",
        description: "Please add some names before spinning the wheel.",
        variant: "destructive"
      });
      return;
    }
    
    if (isSpinning) return;
    
    setWinner(null);
    setIsSpinning(true);
    wheelRef.current?.spin();
  }, [names.length, isSpinning]);

  const handleSpinComplete = useCallback((selectedName: string) => {
    setWinner(selectedName);
    setIsSpinning(false);
    toast({
      title: "🎉 We have a winner!",
      description: `Congratulations ${selectedName}!`,
    });
  }, []);

  const addName = useCallback((name: string) => {
    if (name.trim() && !names.includes(name.trim())) {
      setNames(prev => [...prev, name.trim()]);
    }
  }, [names]);

  const removeName = useCallback((index: number) => {
    setNames(prev => prev.filter((_, i) => i !== index));
  }, []);

  const clearAll = useCallback(() => {
    setNames([]);
    setWinner(null);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 font-inter">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 font-poppins">🎯 Lucky Wheel Spinner</h1>
              <p className="text-gray-600 mt-1">Pick a random winner from your list of names</p>
            </div>
            <Badge variant="secondary" className="hidden sm:block">
              {names.length} {names.length === 1 ? 'name' : 'names'}
            </Badge>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-3 space-y-8">
            {/* Wheel and Winner Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card className="p-6">
                <CardHeader className="text-center pb-4">
                  <CardTitle className="font-poppins">Spin the Wheel!</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col items-center space-y-4">
                  <WheelSpinner
                    ref={wheelRef}
                    names={names}
                    settings={settings}
                    onSpinComplete={handleSpinComplete}
                    isSpinning={isSpinning}
                  />
                  <Button 
                    onClick={handleSpin}
                    disabled={isSpinning || names.length === 0}
                    size="lg"
                    className="w-full font-semibold animate-pulse-glow"
                  >
                    {isSpinning ? 'Spinning...' : 'Spin the Wheel!'}
                  </Button>
                </CardContent>
              </Card>

              <WinnerDisplay winner={winner} />
            </div>

            {/* Name Management and Customization */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <NameManager
                names={names}
                onAddName={addName}
                onRemoveName={removeName}
                onClearAll={clearAll}
              />
              
              <CustomizationPanel
                settings={settings}
                onSettingsChange={setSettings}
              />
            </div>
          </div>

          {/* Right Column - Ad Space */}
          <div className="lg:col-span-1">
            <AdSpace position="sidebar" />
          </div>
        </div>

        {/* Bottom Ad Space */}
        <div className="mt-12">
          <AdSpace position="bottom" />
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-50 border-t mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center space-y-4">
            <p className="text-gray-600">
              © 2024 Lucky Wheel Spinner. Free online random name picker tool.
            </p>
            <p className="text-sm text-gray-500">
              Perfect for contests, classroom activities, team selections, and decision making.
            </p>
            <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
              <span>Created with ❤️ by</span>
              <a 
                href="https://github.com/ronakmunjapara" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 font-medium transition-colors"
              >
                @ronakmunjapara
              </a>
            </div>
            <div className="text-xs text-gray-400">
              <p>Free online spinner wheel • No registration required • Works on all devices</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
