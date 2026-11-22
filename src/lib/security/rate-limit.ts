/**
 * In-memory sliding-window rate limiter for protecting sensitive routes and AI operations.
 * Operates on a per-user or per-identifier basis without introducing external Redis dependencies for beta.
 */

interface RateLimitConfig {
  limit: number; // Max requests allowed within the window
  windowMs: number; // Window duration in milliseconds
}

export const RATE_LIMIT_PROFILES: Record<string, RateLimitConfig> = {
  advisor: {
    limit: 10,
    windowMs: 60 * 1000, // 10 requests per minute
  },
  statement_upload: {
    limit: 5,
    windowMs: 60 * 1000, // 5 requests per minute
  },
  general_mutation: {
    limit: 30,
    windowMs: 60 * 1000, // 30 requests per minute
  },
};

interface RateLimitResult {
  success: boolean;
  limit: number;
  remaining: number;
  resetMs: number;
  error?: string;
}

// Global in-memory storage of timestamps per key
const tracker = new Map<string, number[]>();

/**
 * Checks whether an identifier (e.g. userId or IP) is within rate limits for a given profile or custom config.
 */
export function checkRateLimit(
  profileOrConfig: string | RateLimitConfig,
  identifier: string
): RateLimitResult {
  const config =
    typeof profileOrConfig === "string"
      ? RATE_LIMIT_PROFILES[profileOrConfig] || { limit: 20, windowMs: 60000 }
      : profileOrConfig;

  const key = `${typeof profileOrConfig === "string" ? profileOrConfig : "custom"}:${identifier}`;
  const now = Date.now();
  const windowStart = now - config.windowMs;

  const history = tracker.get(key) || [];
  // Filter out timestamps outside the active sliding window
  const activeHistory = history.filter((timestamp) => timestamp > windowStart);

  if (activeHistory.length >= config.limit) {
    const oldest = activeHistory[0];
    const resetMs = Math.max(0, oldest + config.windowMs - now);
    const resetSeconds = Math.ceil(resetMs / 1000);

    return {
      success: false,
      limit: config.limit,
      remaining: 0,
      resetMs,
      error: `Rate limit reached (${config.limit} requests per ${Math.round(config.windowMs / 1000)}s). Please wait ${resetSeconds} seconds.`,
    };
  }

  // Record this request
  activeHistory.push(now);
  tracker.set(key, activeHistory);

  return {
    success: true,
    limit: config.limit,
    remaining: config.limit - activeHistory.length,
    resetMs: config.windowMs,
  };
}

/**
 * Helper to reset tracker (used in unit tests)
 */
export function clearRateLimits(): void {
  tracker.clear();
}
