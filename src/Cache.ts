import { Line } from './matchers/Line';

type CacheMap<T> = Map<string | number, T>;

export const GLOBAL_CACHE: Record<string, CacheMap<Line>> = {};

export function registerCache(
  collection: string,
  softRegister: boolean = false
) {
  if (GLOBAL_CACHE[collection] && !softRegister) {
    throw new ReferenceError(
      `Trying to cache register collection ${collection} that's already have been registered.`
    );
  }
  GLOBAL_CACHE[collection] = new Map();
}

export function get<T extends Line>(collection: string, key: string | number) {
  const coll: CacheMap<T> = GLOBAL_CACHE[collection] as CacheMap<T>;
  return coll.get(key);
}

export function set<T extends Line>(
  collection: string,
  key: string | number,
  value: T
) {
  GLOBAL_CACHE[collection].set(key, value);
}
