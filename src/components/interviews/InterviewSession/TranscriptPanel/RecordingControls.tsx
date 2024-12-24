import { Button } from '@/components/ui/button';
import { Mic, MicOff, AlertCircle } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface RecordingControlsProps {
  isListening: boolean;
  isAvailable: boolean;
  error: string | null;
  onToggle: () => void;
}

export function RecordingControls({
  isListening,
  isAvailable,
  error,
  onToggle,
}: RecordingControlsProps) {
  if (!isAvailable) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          Speech recognition is not supported in your browser.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="p-4 border-b">
      <div className="flex items-center justify-between">
        <Button
          variant={isListening ? "destructive" : "default"}
          onClick={onToggle}
          className="gap-2"
        >
          {isListening ? (
            <>
              <MicOff className="h-4 w-4" />
              Stop Recording
            </>
          ) : (
            <>
              <Mic className="h-4 w-4" />
              Start Recording
            </>
          )}
        </Button>
        {isListening && (
          <div className="flex items-center gap-2">
            <span className="animate-pulse text-destructive">●</span>
            <span className="text-sm text-muted-foreground">Recording...</span>
          </div>
        )}
      </div>
      {error && (
        <Alert variant="destructive" className="mt-2">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
    </div>
  );
}