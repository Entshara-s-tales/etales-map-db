import { Line } from './Line';
import { Matcher } from './Matcher';

export type ParsedWC3String = {
  id: number;
  value: string;
  comment?: string;
};

type CommentType = 'Items' | 'Abilities' | 'Units' | 'Doodads';
type StringType = 'ability' | 'item' | 'unit' | 'doodad' | 'unknown';

type ParsedComment = {
  type: CommentType;
  id: string;
  name: string;
  where: string;
};

export type WC3StringObject = {
  type: StringType;
  id: string;
  name: string;
  where: string;
};

export type WC3StringDataObject = {
  stringId: number;
  text: string;
  comment: string;
  object: WC3StringObject | undefined;
};

export class WC3String {
  static ObjectTypeMapper = {
    Items: 'item',
    Abilities: 'ability',
    Units: 'unit',
    Doodads: 'doodad',
  };

  stringId: number;
  text: string;
  comment: string = '';
  object: WC3StringObject | undefined;

  constructor(parsedString: ParsedWC3String) {
    const { id, value, comment } = parsedString;
    this.text = value;
    this.stringId = id;
    if (comment) {
      const parsedComment = parseComment(comment);
      if (parsedComment) {
        const { type, id, name, where } = parsedComment;
        const mappedType = (WC3String.ObjectTypeMapper[type] ||
          'unknown') as StringType;
        this.object = {
          type: mappedType,
          id,
          name,
          where,
        };
      }
    }
  }
}

function parseComment(comment: string): ParsedComment | undefined {
  const re = /\/\/ (?<type>Items|Abilities|Units|Doodads): (?<id>[a-zA-Z0-9]+) \((?<name>.*)\), (?<where>.*)/;
  const match = comment.match(re);
  if (match?.groups) {
    const { type, id, name, where } = match.groups;
    return {
      type: type as CommentType,
      id,
      name,
      where,
    };
  }
  return undefined;
}

function parseId(stringWithId: string): number {
  return parseInt(stringWithId.replace('STRING ', ''), 10);
}

function match(wc3String: string): ParsedWC3String {
  const lines = wc3String.split('\n');
  // Has comment
  if (lines.length === 5) {
    const [withId, comment, , value] = lines;
    return {
      id: parseId(withId),
      comment: comment,
      value,
    };
  }
  const [withId, , value] = lines;
  return {
    id: parseId(withId),
    value,
  };
}

export const StringMatcher: Matcher<ParsedWC3String, WC3String> = {
  name: 'strings',
  match: (line: string) => match(line),
  getId: (line: Line<WC3String>) => String(line.data!.stringId),
  factory(matched: ParsedWC3String) {
    return new WC3String(matched);
  },
};
