export interface Transcript {
  id: string;
  speaker: 'interviewer' | 'candidate';
  content: string;
  timestamp: Date;
}

export interface SpeechRecognitionState {
  isListening: boolean;
  error: string | null;
}