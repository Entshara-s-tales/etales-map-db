import { registerCache, set } from '../Cache';
import { Line, MapData } from './Line';

export interface Matcher {
  name: string;
  match: (line: string) => RegExpMatchArray | null;
  factory: (matches: RegExpMatchArray) => MapData;
  cacheKey?: string;
  getId: (line: Line) => string;
  softCache?: boolean;
}

export class Matchers {
  private matchers: Matcher[] = [];

  register(matcher: Matcher): void {
    this.matchers.push(matcher);
    if (matcher.cacheKey) {
      registerCache(matcher.cacheKey, !!matcher.softCache);
    }
  }

  registerAll(matchers: Matcher[]): void {
    matchers.forEach(x => this.register(x));
  }

  matchMapData(line: string): Line | undefined {
    for (const matcher of this.matchers) {
      const matched = matcher.match(line);
      if (matched !== null) {
        const item = new Line(line, matcher.name);
        const matcherDataObject = matcher.factory(matched);
        item.setData(matcherDataObject);
        if (matcher.cacheKey) {
          set(matcher.cacheKey, matcher.getId(item), item);
        }
        if (item instanceof Line) {
          return item;
        }
      }
    }
    return undefined;
  }
}
