import { OpenAIStream, streamResponse } from './stream';
import { OPENAI_CONFIG } from './config';

export interface Message {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export class ChatService {
  private messages: Message[] = [];

  constructor(
    private apiKey: string,
    systemPrompt: string
  ) {
    this.messages = [{ role: 'system', content: systemPrompt }];
  }

  async *streamChat(userMessage: string) {
    // Add user message to history
    this.messages.push({ role: 'user', content: userMessage });

    try {
      const reader = await OpenAIStream(this.messages, this.apiKey);
      let fullResponse = '';

      for await (const chunk of streamResponse(reader)) {
        fullResponse += chunk;
        yield chunk;
      }

      // Add assistant's response to history
      this.messages.push({ role: 'assistant', content: fullResponse });
    } catch (error) {
      console.error('Chat stream error:', error);
      throw error;
    }
  }

  updateSystemPrompt(systemPrompt: string) {
    this.messages[0] = { role: 'system', content: systemPrompt };
  }

  clearHistory(systemPrompt: string) {
    this.messages = [{ role: 'system', content: systemPrompt }];
  }
}