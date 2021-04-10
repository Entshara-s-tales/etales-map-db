import { Matcher } from './Matcher';

const itemRe = /set udg_itmpool\[(.*)\]='?([\da-zA-Z]+)'? * \/\/(.*)/;

export const ItemMatcher: Matcher = {
  name: 'item',
  cacheKey: 'item',
  match: x => x.match(itemRe),
};
