export class SpeechRecognitionService {
  private recognition: SpeechRecognition | null = null;
  private isSupported: boolean = 'webkitSpeechRecognition' in window;

  constructor(
    private onResult: (text: string) => void,
    private onError: (error: string) => void
  ) {
    if (this.isSupported) {
      this.recognition = new (window.webkitSpeechRecognition || window.SpeechRecognition)();
      this.setupRecognition();
    }
  }

  private setupRecognition() {
    if (!this.recognition) return;

    this.recognition.continuous = true;
    this.recognition.interimResults = true;
    this.recognition.lang = 'en-US';

    this.recognition.onresult = (event) => {
      const result = event.results[event.results.length - 1];
      if (result.isFinal) {
        this.onResult(result[0].transcript);
      }
    };

    this.recognition.onerror = (event) => {
      this.onError(event.error);
    };
  }

  start() {
    if (!this.isSupported) {
      this.onError('Speech recognition is not supported in this browser');
      return;
    }
    this.recognition?.start();
  }

  stop() {
    this.recognition?.stop();
  }

  isAvailable() {
    return this.isSupported;
  }
}