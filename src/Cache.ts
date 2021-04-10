import { Line } from './matchers/LineParser';

type CacheMap<T> = Map<string | number, T>;

const caches: Record<string, CacheMap<Line>> = {};

export function registerCache(
  collection: string,
  softRegister: boolean = false
) {
  if (caches[collection] && !softRegister) {
    throw new ReferenceError(
      `Trying to cache register collection ${collection} that's already have been registered.`
    );
  }
  caches[collection] = new Map();
}

export function get<T extends Line>(collection: string, key: string | number) {
  const coll: CacheMap<T> = caches[collection] as CacheMap<T>;
  return coll.get(key);
}

export function set<T extends Line>(
  collection: string,
  key: string | number,
  value: T
) {
  caches[collection].set(key, value);
}
