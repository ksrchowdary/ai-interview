import { useState, useCallback, useEffect } from 'react';
import { SpeechRecognitionService } from '@/lib/speech/recognition';
import type { SpeechRecognitionState } from '@/lib/speech/types';

export function useSpeechRecognition(onTranscript: (text: string) => void) {
  const [state, setState] = useState<SpeechRecognitionState>({
    isListening: false,
    error: null,
  });

  const [recognition, setRecognition] = useState<SpeechRecognitionService | null>(null);

  useEffect(() => {
    const service = new SpeechRecognitionService(
      (text) => onTranscript(text),
      (error) => setState(prev => ({ ...prev, error }))
    );
    setRecognition(service);
  }, [onTranscript]);

  const startListening = useCallback(() => {
    if (!recognition) return;
    
    setState({ isListening: true, error: null });
    recognition.start();
  }, [recognition]);

  const stopListening = useCallback(() => {
    if (!recognition) return;
    
    setState(prev => ({ ...prev, isListening: false }));
    recognition.stop();
  }, [recognition]);

  return {
    ...state,
    isAvailable: recognition?.isAvailable() ?? false,
    startListening,
    stopListening,
  };
}