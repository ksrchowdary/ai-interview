import { useState } from 'react';
import { SpeechPanel } from './SpeechPanel';
import { ChatPanel } from './ChatPanel';
import { QuestionForm } from './QuestionForm';
import { useConversation } from '@/hooks/useConversation';

export function InterviewSession() {
  const {
    transcripts,
    messages,
    isProcessing,
    addTranscript,
    handleMessage,
  } = useConversation();

  const [selectedText, setSelectedText] = useState('');

  const handleSendToChat = (text: string) => {
    handleMessage(text);
    setSelectedText('');
  };

  return (
    <div className="h-screen flex flex-col">
      <div className="flex-1 flex min-h-0">
        {/* Speech panel */}
        <div className="w-1/3 border-r">
          <SpeechPanel 
            transcripts={transcripts}
            onTranscript={addTranscript}
            onSendToChat={handleSendToChat}
            onTextSelect={setSelectedText}
          />
        </div>

        {/* Chat panel */}
        <div className="w-2/3">
          <ChatPanel 
            messages={messages}
            isProcessing={isProcessing}
          />
        </div>
      </div>

      {/* Question form */}
      <QuestionForm
        value={selectedText}
        onChange={setSelectedText}
        onSubmit={handleSendToChat}
        isSubmitting={isProcessing}
      />
    </div>
  );
}