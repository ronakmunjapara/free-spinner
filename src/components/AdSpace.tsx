
import { Card, CardContent } from '@/components/ui/card';

interface AdSpaceProps {
  position: 'sidebar' | 'bottom';
}

const AdSpace = ({ position }: AdSpaceProps) => {
  const dimensions = position === 'sidebar' 
    ? 'w-full h-[600px]' 
    : 'w-full h-[200px]';

  return (
    <Card className={`${dimensions} bg-gradient-to-br from-gray-100 to-gray-200 border-dashed border-2 border-gray-300`}>
      <CardContent className="h-full flex flex-col items-center justify-center p-8 text-center">
        <div className="text-4xl mb-4 opacity-40">📢</div>
        <h3 className="text-lg font-semibold text-gray-600 mb-2">
          Advertisement Space
        </h3>
        <p className="text-sm text-gray-500 max-w-md">
          {position === 'sidebar' 
            ? 'This area is reserved for Google Ads or custom banner advertisements. Perfect for monetization while keeping the main functionality accessible.'
            : 'Bottom banner advertisement space - ideal for responsive ad units that work across all device sizes.'
          }
        </p>
        <div className="mt-4 px-4 py-2 bg-gray-300 text-gray-600 rounded text-xs font-mono">
          {position === 'sidebar' ? '300x600' : '728x90'} Ad Unit
        </div>
      </CardContent>
    </Card>
  );
};

export default AdSpace;
