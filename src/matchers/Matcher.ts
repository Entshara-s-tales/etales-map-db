import { registerCache, set } from '../Cache';

export abstract class MatcherResult {
  name: string;
  id: number;
  uuid: string;
  line: string;

  constructor(line: string, id: string, uuid: string, name: string) {
    this.line = line;
    this.id = parseInt(id, 10);
    this.uuid = uuid.replaceAll("'", '');
    this.name = name;
  }

  toJSON() {
    return {
      id: this.id,
      name: this.name,
    };
  }
}

export interface Matcher {
  name: string;
  match: (line: string) => RegExpMatchArray | null;
  factory: (...groups: any[]) => MatcherResult;
  cacheKey?: string;
  softCache?: boolean;
}

export class Matchers {
  private matchers: Record<string, Matcher> = {};

  register(matcher: Matcher): void {
    this.matchers[matcher.name] = matcher;
    if (matcher.cacheKey) {
      registerCache(matcher.cacheKey, !!matcher.softCache);
    }
  }

  match(line: string) {
    const matchers = Object.keys(this.matchers);
    for (const key of matchers) {
      const matcher = this.matchers[key];
      const matched = matcher.match(line);
      if (matched !== null) {
        const item = matcher.factory(...matched);
        if (matcher.cacheKey) {
          set(matcher.cacheKey, item.id, item);
        }
      }
    }
  }
}
