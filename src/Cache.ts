import { Line } from "./matchers/Line";

type CacheMap<T> = Map<string | number, T>;

export const GLOBAL_CACHE: Record<string, CacheMap<Line<unknown>>> = {};

export function registerCache(collection: string, softRegister = false) {
  if (GLOBAL_CACHE[collection] && !softRegister) {
    throw new ReferenceError(
      `Trying to cache register collection ${collection} that's already have been registered.`
    );
  }
  GLOBAL_CACHE[collection] = new Map();
}

export function get<T extends Line<unknown>>(
  collection: string,
  key: string | number
) {
  const coll: CacheMap<T> = GLOBAL_CACHE[collection] as CacheMap<T>;
  return coll.get(key);
}

export function set<T extends Line<unknown>>(
  collection: string,
  key: string | number,
  value: T
) {
  GLOBAL_CACHE[collection].set(key, value);
}

export function serialize() {
  let cache = "";
  try {
    cache = JSON.stringify(GLOBAL_CACHE, (key, value) => {
      if (value instanceof Map) {
        // TODO: This probably should not be done here, but whatever lol.
        if (key === "itemDrop") {
          return [...value.values()];
        }
        const results: Record<string, string> = {};
        for (const k of value.values()) {
          results[k.data.id] = JSON.stringify(k);
        }
        return results;
      }
      return value;
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("Cache was not stringified properly. Exiting early.");
    throw error;
  }
  return cache;
}
