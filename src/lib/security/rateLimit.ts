interface RateLimitConfig {
  maxRequests: number;
  windowMs: number;
}

interface RateLimitStore {
  [key: string]: {
    count: number;
    resetAt: number;
  };
}

export class RateLimit {
  private store: RateLimitStore = {};

  constructor(private config: RateLimitConfig) {}

  async check(key: string): Promise<boolean> {
    const now = Date.now();
    const record = this.store[key];

    // Clean up expired records
    if (record && record.resetAt <= now) {
      delete this.store[key];
    }

    if (!this.store[key]) {
      this.store[key] = {
        count: 1,
        resetAt: now + this.config.windowMs,
      };
      return true;
    }

    if (this.store[key].count >= this.config.maxRequests) {
      return false;
    }

    this.store[key].count++;
    return true;
  }

  getRemainingRequests(key: string): number {
    const record = this.store[key];
    if (!record) return this.config.maxRequests;
    return Math.max(0, this.config.maxRequests - record.count);
  }

  getResetTime(key: string): number {
    const record = this.store[key];
    if (!record) return 0;
    return Math.max(0, record.resetAt - Date.now());
  }
}