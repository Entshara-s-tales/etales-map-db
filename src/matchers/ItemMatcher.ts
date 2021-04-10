import { splitNameFromLevel } from './LineParser';
import { Matcher, MatcherResult } from './Matcher';

export class Item extends MatcherResult {
  level?: number;

  constructor(line: string, id: string, uuid: string, nameWithLevel: string) {
    const [name, level] = splitNameFromLevel(nameWithLevel);
    super(line, id, uuid, name);
    this.level = level;
  }

  toJSON() {
    return {
      id: this.id,
      name: this.name,
      level: this.level,
    };
  }
}

const itemRe = /set udg_itmpool\[(.*)\]=(.*) * \/\/(.*)/;

export const ItemMatcher: Matcher = {
  name: 'item',
  cacheKey: 'item',
  match: x => x.match(itemRe),
  factory: (line: string, id: string, uuid: string, name: string) =>
    new Item(line, id, uuid, name),
};
