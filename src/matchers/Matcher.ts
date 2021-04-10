import { registerCache, set } from '../Cache';
import { Line } from './LineParser';

export interface Matcher {
  name: string;
  match: (line: string) => RegExpMatchArray | null;
  factory?: (
    line: string,
    id: string,
    uuid: string,
    nameWithLevel: string
  ) => Line;
  cacheKey?: string;
  softCache?: boolean;
}

export class Matchers {
  private matchers: Matcher[] = [];

  private factory(
    line: string,
    id: string,
    uuid: string,
    nameWithLevel: string,
    matcher: string
  ) {
    return new Line(line, id, uuid, nameWithLevel, matcher);
  }

  register(matcher: Matcher): void {
    this.matchers.push(matcher);
    if (matcher.cacheKey) {
      registerCache(matcher.cacheKey, !!matcher.softCache);
    }
  }

  registerAll(matchers: Matcher[]): void {
    matchers.forEach(x => this.register(x));
  }

  match(line: string): Line | undefined {
    for (const matcher of this.matchers) {
      const matched = matcher.match(line);
      if (matched !== null) {
        const [line, id, uuid, nameWithLevel] = matched;
        const item =
          matcher.factory?.(line, id, uuid, nameWithLevel) ??
          this.factory(line, id, uuid, nameWithLevel, matcher.name);
        if (matcher.cacheKey) {
          set(matcher.cacheKey, item.id, item);
        }
        return item;
      }
    }
    return undefined;
  }
}
