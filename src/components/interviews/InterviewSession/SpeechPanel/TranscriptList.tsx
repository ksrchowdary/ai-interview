import { formatDistanceToNow } from 'date-fns';
import type { Transcript } from '@/lib/speech/types';

interface TranscriptListProps {
  transcripts: Transcript[];
  onSelect: (text: string) => void;
}

export function TranscriptList({ transcripts, onSelect }: TranscriptListProps) {
  const handleSelection = () => {
    const selection = window.getSelection();
    if (selection && selection.toString()) {
      onSelect(selection.toString());
    }
  };

  if (!transcripts.length) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center p-4 text-muted-foreground">
        <p>Start recording to see your transcript here</p>
      </div>
    );
  }

  return (
    <div className="space-y-4 p-4">
      {transcripts.map((transcript) => (
        <div
          key={transcript.id}
          className="rounded-lg bg-muted/50 p-4"
          onMouseUp={handleSelection}
        >
          <div className="flex justify-between items-start mb-2">
            <span className="font-medium capitalize">{transcript.speaker}</span>
            <span className="text-xs text-muted-foreground">
              {formatDistanceToNow(transcript.timestamp, { addSuffix: true })}
            </span>
          </div>
          <p className="text-sm leading-relaxed">{transcript.content}</p>
        </div>
      ))}
    </div>
  );
}