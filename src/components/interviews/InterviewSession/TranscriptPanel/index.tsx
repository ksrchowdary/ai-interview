import { useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { ConversationItem } from './ConversationItem';
import { RecordingControls } from './RecordingControls';
import { Send } from 'lucide-react';
import { useSpeechRecognition } from '@/hooks/useSpeechRecognition';
import type { Transcript } from '@/lib/speech/types';

interface TranscriptPanelProps {
  onSendToChat: (text: string) => void;
}

export function TranscriptPanel({ onSendToChat }: TranscriptPanelProps) {
  const [selectedText, setSelectedText] = useState('');
  const [transcripts, setTranscripts] = useState<Transcript[]>([]);

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

  const toggleRecording = () => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  };

  return (
    <div className="relative h-full flex flex-col">
      <RecordingControls
        isListening={isListening}
        isAvailable={isAvailable}
        error={error}
        onToggle={toggleRecording}
      />
      
      <div className="flex-1 overflow-y-auto p-4">
        {transcripts.map((transcript) => (
          <ConversationItem
            key={transcript.id}
            speaker={transcript.speaker}
            content={transcript.content}
            timestamp={transcript.timestamp}
            onSelect={handleTextSelection}
          />
        ))}
      </div>
      
      {selectedText && (
        <div className="absolute bottom-4 right-4">
          <Button
            size="sm"
            className="gap-2"
            onClick={() => {
              onSendToChat(selectedText);
              setSelectedText('');
            }}
          >
            <Send className="h-4 w-4" />
            Send to Chat
          </Button>
        </div>
      )}
    </div>
  );
}