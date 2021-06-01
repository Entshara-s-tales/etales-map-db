import { registerCache, set } from "../Cache";
import { Line } from "./Line";

export interface Matcher<LineMatch extends unknown, DataType extends unknown> {
  name: string;
  match: (line: string) => LineMatch | null;
  factory: (matches: LineMatch) => DataType;
  cacheKey?: string;
  getId: (line: Line<DataType>) => string;
  softCache?: boolean;
}

export class Matchers<LineMatch extends unknown> {
  private matchers: Matcher<LineMatch, any>[] = [];

  register<DataType extends unknown>(
    matcher: Matcher<LineMatch, DataType>
  ): void {
    this.matchers.push(matcher);
    if (matcher.cacheKey) {
      registerCache(matcher.cacheKey, Boolean(matcher.softCache));
    }
  }

  registerAll(matchers: Matcher<LineMatch, any>[]): void {
    matchers.forEach((x) => this.register(x));
  }

  match(line: string): Line<unknown> | undefined {
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
