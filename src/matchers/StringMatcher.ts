type ParsedWC3String = {
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

type WC3StringObject = {
  type: StringType;
  id: string;
  name: string;
  where: string;
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

  constructor(wc3String: string) {
    const { id, value, comment } = this.parseString(wc3String);
    this.text = value;
    this.stringId = id;
    if (comment) {
      const parsedComment = this.parseComment(comment);
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

  private parseString(wc3String: string): ParsedWC3String {
    const lines = wc3String.split('\n');
    // Has comment
    if (lines.length === 5) {
      const [withId, comment, , value] = lines;
      return {
        id: this.parseId(withId),
        comment: comment,
        value,
      };
    }
    const [withId, , value] = lines;
    return {
      id: this.parseId(withId),
      value,
    };
  }

  private parseComment(comment: string): ParsedComment | undefined {
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

  private parseId(stringWithId: string): number {
    return parseInt(stringWithId.replace('STRING ', ''), 10);
  }
}
