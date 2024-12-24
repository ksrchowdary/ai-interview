import { useInterviewPlayback } from '@/hooks/useInterviewPlayback';
import { ChatPanel } from '@/components/interviews/InterviewSession/ChatPanel';
import { TranscriptList } from '@/components/interviews/InterviewSession/SpeechPanel/TranscriptList';

export function PlaybackView() {
  const { transcripts, messages, isLoading, error } = useInterviewPlayback();

  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <p className="text-muted-foreground">Loading interview...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-screen flex items-center justify-center">
        <p className="text-destructive">{error}</p>
      </div>
    );
  }

  return (
    <div className="h-screen flex">
      {/* Speech panel */}
      <div className="w-1/3 border-r">
        <TranscriptList 
          transcripts={transcripts}
          onSelect={() => {}} // Disabled in playback mode
        />
      </div>

      {/* Chat panel */}
      <div className="w-2/3">
        <ChatPanel 
          messages={messages}
          isProcessing={false}
        />
      </div>
    </div>
  );
}