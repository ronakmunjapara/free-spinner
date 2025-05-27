
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { SpinnerSettings } from '@/pages/Index';

interface CustomizationPanelProps {
  settings: SpinnerSettings;
  onSettingsChange: (settings: SpinnerSettings) => void;
}

const colorPalettes = {
  'Vibrant': ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', '#DDA0DD', '#98D8C8', '#F7DC6F'],
  'Ocean': ['#006994', '#13A5DC', '#94D1F2', '#7FB3D3', '#5A9FD4', '#266DD3', '#1B4F72', '#85C1E9'],
  'Sunset': ['#FF9A8B', '#A8E6CF', '#FFB347', '#FF6B9D', '#C780E8', '#87CEEB', '#98FB98', '#F0E68C'],
  'Earth': ['#8B4513', '#CD853F', '#DEB887', '#F4A460', '#D2691E', '#BC8F8F', '#F5DEB3', '#D2B48C'],
  'Neon': ['#FF073A', '#39FF14', '#00FFFF', '#FF1493', '#7FFF00', '#FF4500', '#DA70D6', '#00FF7F'],
  'Pastel': ['#FFB3BA', '#BAFFC9', '#BAE1FF', '#FFFFBA', '#FFDFBA', '#E0BBE4', '#D4F0F0', '#FCF4A3']
};

const fonts = [
  { name: 'Poppins', label: 'Poppins (Modern)' },
  { name: 'Inter', label: 'Inter (Clean)' },
  { name: 'Arial', label: 'Arial (Classic)' },
  { name: 'Georgia', label: 'Georgia (Elegant)' },
  { name: 'monospace', label: 'Monospace (Technical)' }
];

const CustomizationPanel = ({ settings, onSettingsChange }: CustomizationPanelProps) => {
  const updateSettings = (updates: Partial<SpinnerSettings>) => {
    onSettingsChange({ ...settings, ...updates });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-poppins">Customize Wheel</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Color Palette */}
        <div className="space-y-3">
          <h4 className="font-medium text-sm text-gray-700">Color Palette</h4>
          <div className="grid grid-cols-2 gap-2">
            {Object.entries(colorPalettes).map(([name, colors]) => (
              <Button
                key={name}
                variant={JSON.stringify(settings.colorPalette) === JSON.stringify(colors) ? "default" : "outline"}
                className="h-12 p-2 flex flex-col items-center justify-center"
                onClick={() => updateSettings({ colorPalette: colors })}
              >
                <div className="flex space-x-1 mb-1">
                  {colors.slice(0, 4).map((color, index) => (
                    <div
                      key={index}
                      className="w-3 h-3 rounded-full border border-white"
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
                <span className="text-xs">{name}</span>
              </Button>
            ))}
          </div>
        </div>

        {/* Font Selection */}
        <div className="space-y-3">
          <h4 className="font-medium text-sm text-gray-700">Font</h4>
          <Select
            value={settings.fontFamily}
            onValueChange={(value) => updateSettings({ fontFamily: value })}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {fonts.map((font) => (
                <SelectItem key={font.name} value={font.name}>
                  <span style={{ fontFamily: font.name }}>{font.label}</span>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Spin Duration */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="font-medium text-sm text-gray-700">Spin Duration</h4>
            <span className="text-sm text-gray-500">{settings.spinDuration}s</span>
          </div>
          <Slider
            value={[settings.spinDuration]}
            onValueChange={([value]) => updateSettings({ spinDuration: value })}
            min={2}
            max={8}
            step={0.5}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-gray-400">
            <span>Fast (2s)</span>
            <span>Slow (8s)</span>
          </div>
        </div>

        {/* Preview */}
        <div className="space-y-3">
          <h4 className="font-medium text-sm text-gray-700">Preview</h4>
          <div className="p-4 bg-gray-50 rounded-lg">
            <div className="flex space-x-2 mb-2">
              {settings.colorPalette.slice(0, 6).map((color, index) => (
                <div
                  key={index}
                  className="w-6 h-6 rounded border-2 border-white shadow-sm"
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
            <p 
              className="text-sm font-medium"
              style={{ fontFamily: settings.fontFamily }}
            >
              Sample text in {settings.fontFamily}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CustomizationPanel;
