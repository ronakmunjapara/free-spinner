
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';

interface NameManagerProps {
  names: string[];
  onAddName: (name: string) => void;
  onRemoveName: (index: number) => void;
  onClearAll: () => void;
}

const NameManager = ({ names, onAddName, onRemoveName, onClearAll }: NameManagerProps) => {
  const [newName, setNewName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newName.trim()) {
      onAddName(newName);
      setNewName('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSubmit(e);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-poppins flex items-center justify-between">
          Manage Names
          <Badge variant="outline">{names.length} total</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Add Name Form */}
        <form onSubmit={handleSubmit} className="flex space-x-2">
          <Input
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Enter a name..."
            className="flex-1"
            maxLength={50}
          />
          <Button type="submit" disabled={!newName.trim()}>
            Add
          </Button>
        </form>

        {/* Names List */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h4 className="font-medium text-sm text-gray-700">Current Names:</h4>
            {names.length > 0 && (
              <Button 
                variant="outline" 
                size="sm" 
                onClick={onClearAll}
                className="text-red-600 hover:text-red-700"
              >
                Clear All
              </Button>
            )}
          </div>
          
          <ScrollArea className="h-48 w-full rounded border">
            <div className="p-3 space-y-2">
              {names.length === 0 ? (
                <p className="text-gray-500 text-sm text-center py-4">
                  No names added yet. Add some names to get started!
                </p>
              ) : (
                names.map((name, index) => (
                  <div
                    key={`${name}-${index}`}
                    className="flex items-center justify-between p-2 bg-gray-50 rounded hover:bg-gray-100 transition-colors"
                  >
                    <span className="text-sm font-medium truncate flex-1 mr-2">
                      {name}
                    </span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onRemoveName(index)}
                      className="text-red-600 hover:text-red-700 h-6 w-6 p-0"
                    >
                      ×
                    </Button>
                  </div>
                ))
              )}
            </div>
          </ScrollArea>
        </div>

        {/* Quick Add Suggestions */}
        <div className="space-y-2">
          <h4 className="font-medium text-sm text-gray-700">Quick Add:</h4>
          <div className="flex flex-wrap gap-2">
            {['Team A', 'Team B', 'Team C', 'Winner', 'Player 1'].map((suggestion) => (
              <Button
                key={suggestion}
                variant="outline"
                size="sm"
                onClick={() => onAddName(suggestion)}
                disabled={names.includes(suggestion)}
                className="text-xs"
              >
                + {suggestion}
              </Button>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default NameManager;
