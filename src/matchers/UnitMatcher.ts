import { Matcher } from './Matcher';

const itemRe = /set udg_CreepType\[(.*)\]='?([\da-zA-Z]+)'? * \/\/(.*)/;

export const UnitMatcher: Matcher = {
  name: 'unit',
  cacheKey: 'unit',
  match: x => x.match(itemRe),
};
