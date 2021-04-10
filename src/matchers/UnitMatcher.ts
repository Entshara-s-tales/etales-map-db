import { Matcher } from './Matcher';

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
};

const heroRe = /set udg_HeroPool\[(.*)\]='?([\da-zA-Z]+)'? * \/\/(.*)/;

export const HeroMatcher: Matcher = {
  name: 'hero',
  cacheKey: 'hero',
  match: x => x.match(heroRe),
};
