import { checkRateLimit, clearRateLimits } from "./rate-limit";

function assert(condition: boolean, message: string) {
  if (!condition) {
    throw new Error(`Assertion failed: ${message}`);
  }
}

console.log("Running Rate Limiter Unit Tests...");

clearRateLimits();

const customConfig = { limit: 3, windowMs: 1000 };
const testUser = "usr-test-123";

// 1. First 3 requests should succeed
const res1 = checkRateLimit(customConfig, testUser);
assert(res1.success, "Request 1 should succeed");
assert(res1.remaining === 2, `Remaining should be 2, got ${res1.remaining}`);

const res2 = checkRateLimit(customConfig, testUser);
assert(res2.success, "Request 2 should succeed");
assert(res2.remaining === 1, `Remaining should be 1, got ${res2.remaining}`);

const res3 = checkRateLimit(customConfig, testUser);
assert(res3.success, "Request 3 should succeed");
assert(res3.remaining === 0, `Remaining should be 0, got ${res3.remaining}`);

// 2. 4th request must be rejected
const res4 = checkRateLimit(customConfig, testUser);
assert(!res4.success, "Request 4 should be blocked by rate limiter");
assert(res4.error !== undefined, "Error message should be present");
assert(res4.remaining === 0, "Remaining should be 0");

// 3. Different user should have their own quota
const otherUser = "usr-different-456";
const resOther = checkRateLimit(customConfig, otherUser);
assert(resOther.success, "Different user should succeed under their own limit");

// 4. Test predefined profiles
clearRateLimits();
const advisorRes = checkRateLimit("advisor", testUser);
assert(advisorRes.success, "Advisor profile should succeed on initial call");
assert(advisorRes.limit === 10, "Advisor limit should be 10");

console.log("PASS: All Rate Limiter tests succeeded cleanly.");
