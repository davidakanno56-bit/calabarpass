/**
 * Lightweight Client Cache with Stale-While-Revalidate (SWR) Pattern
 * Provides instant in-memory & localStorage retrieval for packages, itineraries, and configs.
 */

const memoryCache = new Map();
const DEFAULT_TTL = 1000 * 60 * 10; // 10 minutes

export const cacheStore = {
  get(key) {
    // 1. Check memory cache first
    const memoryItem = memoryCache.get(key);
    const now = Date.now();
    if (memoryItem && now < memoryItem.expiry) {
      return memoryItem.value;
    }

    // 2. Check localStorage
    try {
      const stored = localStorage.getItem(`calabarpass_cache_${key}`);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed && now < parsed.expiry) {
          memoryCache.set(key, parsed);
          return parsed.value;
        } else {
          localStorage.removeItem(`calabarpass_cache_${key}`);
        }
      }
    } catch {
      // Storage unavailable or disabled
    }

    return null;
  },

  // Stale getter: returns value even if expired, for background revalidation
  getStale(key) {
    const memoryItem = memoryCache.get(key);
    if (memoryItem) return memoryItem.value;

    try {
      const stored = localStorage.getItem(`calabarpass_cache_${key}`);
      if (stored) {
        const parsed = JSON.parse(stored);
        return parsed?.value || null;
      }
    } catch {
      // ignore
    }
    return null;
  },

  set(key, value, ttl = DEFAULT_TTL) {
    const expiry = Date.now() + ttl;
    const item = { value, expiry };
    memoryCache.set(key, item);

    try {
      localStorage.setItem(`calabarpass_cache_${key}`, JSON.stringify(item));
    } catch {
      // localStorage quota exceeded or disabled
    }
  },

  remove(key) {
    memoryCache.delete(key);
    try {
      localStorage.removeItem(`calabarpass_cache_${key}`);
    } catch {
      // ignore
    }
  },

  clear() {
    memoryCache.clear();
    try {
      Object.keys(localStorage).forEach((k) => {
        if (k.startsWith('calabarpass_cache_')) {
          localStorage.removeItem(k);
        }
      });
    } catch {
      // ignore
    }
  }
};

/**
 * Executes fetcher with Stale-While-Revalidate pattern.
 * If cached data exists, invokes onCachedData immediately.
 * In the background, executes fetcher() and triggers onFreshData if data changed or cache was stale.
 */
export async function fetchWithSWR(key, fetcher, { onData, ttl = DEFAULT_TTL } = {}) {
  const stale = cacheStore.getStale(key);
  if (stale && onData) {
    onData(stale, true); // true = from cache
  }

  try {
    const fresh = await fetcher();
    if (fresh) {
      cacheStore.set(key, fresh, ttl);
      if (onData) {
        onData(fresh, false); // false = fresh from network
      }
    }
    return fresh;
  } catch (err) {
    if (stale) {
      console.warn(`[CalabarPass Cache] Fetch failed for ${key}, using cached fallback:`, err.message);
      return stale;
    }
    throw err;
  }
}
