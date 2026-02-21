// A simple in-memory rate limiter for our own API routes
// Max 10 requests per minute per user session

interface RateLimitInfo {
  count: number;
  resetTime: number;
}

const rateLimits = new Map<string, RateLimitInfo>();

export async function checkRateLimit(identifier: string): Promise<{ success: boolean; retryAfter?: number }> {
  const now = Date.now();
  const WINDOW_MS = 60 * 1000; // 1 minute
  const MAX_REQUESTS = 10;

  const info = rateLimits.get(identifier);

  if (!info || now > info.resetTime) {
    rateLimits.set(identifier, {
      count: 1,
      resetTime: now + WINDOW_MS,
    });
    return { success: true };
  }

  if (info.count >= MAX_REQUESTS) {
    const retryAfterSeconds = Math.ceil((info.resetTime - now) / 1000);
    return { success: false, retryAfter: Math.max(1, retryAfterSeconds) };
  }

  info.count += 1;
  return { success: true };
}
