import { capitalize } from 'lodash';
import { Line, MapData } from './Line';
import { Matcher } from './Matcher';

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

/**
 * Keys for GameObjectData:
 *  name: string;
 *  id: number;
 *  uuid: string;
 *  level?: number;
 */

export function gameObjectFactory(matches: RegExpMatchArray): MapData {
  const [, id, uuid, nameWithLevel] = matches;
  const [name, level] = splitNameFromLevel(nameWithLevel);
  const objectName = name
    .split(' ')
    .map(x => capitalize(x))
    .join(' ');
  return {
    name: objectName,
    id: parseInt(id, 10),
    uuid: uuid.replaceAll("'", ''),
    level,
  };
}

function getId(line: Line): string {
  return String(line.data['id']);
}

/**
 * If CreepType doesn't have a level it means that it's a Hero unit, a playable hero
 * so it can be counted differently.
 * TODO: Probably take care of that later?
 */
const unitRe = /set udg_CreepType\[(.*)\]='?([\da-zA-Z]+)'? * \/\/(.*)/;

// Quest monster regex
// TODO: handle this in the future
// const unitMonsterRe = /set s__monster\[(.*)\]='?([\da-zA-Z]+)'? * \/\/(.*)/;

export const UnitMatcher: Matcher = {
  name: 'unit',
  cacheKey: 'unit',
  match: x => x.match(unitRe),
  factory: gameObjectFactory,
  getId,
};

const heroRe = /set udg_HeroPool\[(.*)\]='?([\da-zA-Z]+)'? * \/\/(.*)/;

export const HeroMatcher: Matcher = {
  name: 'hero',
  cacheKey: 'hero',
  match: x => x.match(heroRe),
  factory: gameObjectFactory,
  getId,
};

const itemRe = /set udg_itmpool\[(.*)\]='?([\da-zA-Z]+)'? * \/\/(.*)/;
export const ItemMatcher: Matcher = {
  name: 'item',
  cacheKey: 'item',
  match: x => x.match(itemRe),
  factory: gameObjectFactory,
  getId,
};
