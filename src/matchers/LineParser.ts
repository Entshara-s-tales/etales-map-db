import { capitalize } from 'lodash';

const replacer = /lvl|level|lev/gi;
const splitBy = /([a-zA-Z0-9| ]+)  ?([\d]+)/i;

export function splitNameFromLevel(
  nameWithLevel: string
): [string, number | undefined] {
  const cleanedNamed = nameWithLevel.replaceAll(replacer, '');
  const results = cleanedNamed.trim().split(splitBy);
  if (results.length === 1) {
    return [results[0].trim(), undefined];
  } else {
    // First one is invalid here
    const [, name, level] = results;
    return [name.trim(), level ? parseInt(level.trim(), 10) : undefined];
  }
}

export class Line {
  name: string;
  id: number;
  uuid: string;
  line: string;
  level?: number;

  constructor(line: string, id: string, uuid: string, nameWithLevel: string) {
    const [name, level] = splitNameFromLevel(nameWithLevel);
    this.line = line;
    this.id = parseInt(id, 10);
    this.uuid = uuid.replaceAll("'", '');
    this.name = name
      .split(' ')
      .map(x => capitalize(x))
      .join(' ');
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
