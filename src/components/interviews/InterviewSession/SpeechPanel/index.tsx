import { useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Mic, MicOff, Send } from 'lucide-react';
import { useSpeechRecognition } from '@/hooks/useSpeechRecognition';
import { TranscriptList } from './TranscriptList';
import type { Transcript } from '@/lib/speech/types';

interface SpeechPanelProps {
  onSendToChat: (text: string) => void;
  onTextSelect: (text: string) => void;
}

export function SpeechPanel({ onSendToChat, onTextSelect }: SpeechPanelProps) {
  const [transcripts, setTranscripts] = useState<Transcript[]>([]);
  const [selectedText, setSelectedText] = useState('');

  const handleNewTranscript = useCallback((text: string) => {
    setTranscripts(prev => [...prev, {
      id: crypto.randomUUID(),
      speaker: 'candidate',
      content: text,
      timestamp: new Date()
    }]);
  }, []);

  const {
    isListening,
    isAvailable,
    error,
    startListening,
    stopListening,
  } = useSpeechRecognition(handleNewTranscript);

  const handleTextSelection = (text: string) => {
    setSelectedText(text);
  };

  return (
    <div className="h-full flex flex-col">
      {/* Recording controls */}
      <div className="p-4 border-b">
        <Button
          onClick={() => isListening ? stopListening() : startListening()}
          variant={isListening ? "destructive" : "default"}
          className="w-full gap-2"
          disabled={!isAvailable}
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
          <div className="flex items-center gap-2 mt-2 text-sm text-muted-foreground">
            <span className="animate-pulse text-destructive">●</span>
            Recording...
          </div>
        )}
        
        {error && (
          <p className="mt-2 text-sm text-destructive">{error}</p>
        )}
      </div>

      {/* Transcripts */}
      <div className="flex-1 overflow-y-auto">
        <TranscriptList 
          transcripts={transcripts}
          onSelect={handleTextSelection}
        />
      </div>

      {/* Send selection to chat */}
      {selectedText && (
        <div className="p-4 border-t">
          <div className="flex gap-2">
            <Button
              onClick={() => {
                onSendToChat(selectedText);
                setSelectedText('');
              }}
              className="flex-1 gap-2"
            >
              <Send className="h-4 w-4" />
              Send to Chat
            </Button>
            <Button
              onClick={() => {
                onTextSelect(selectedText);
                setSelectedText('');
              }}
              variant="secondary"
              className="flex-1 gap-2"
            >
              Copy to Question
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}