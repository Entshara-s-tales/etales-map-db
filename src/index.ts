import path from 'path';
import fs from 'fs';
import { ItemDropMatcher } from './matchers/ItemDropMatchers';
import { Matchers } from './matchers/Matcher';
import {
  HeroMatcher,
  ItemMatcher,
  UnitMatcher,
} from './matchers/GameObjectMatchers';
import { GLOBAL_CACHE } from './Cache';

const DEBUG = false;

const mapfile = path.resolve(__dirname, '../scripts.j');
if (fs.existsSync(mapfile)) {
  console.log(`Found mapfile at ${mapfile}.`);
}
console.log(`Reading map.`);
const scripts = fs.readFileSync(mapfile, 'utf8');

console.log(`Splitting into lines.`);
const lines = scripts.split('\n');

console.log(`${lines.length} lines of JASS code found.`);

const matchers = new Matchers();
matchers.registerAll([HeroMatcher, ItemMatcher, UnitMatcher, ItemDropMatcher]);

for (const line of lines) {
  const l = matchers.matchMapData(line);
  if (l && DEBUG) {
    console.log(`Matcher: "${l.matcher}", line: "${line}"`);
  }
}

console.log('Stringifying cache');
let cache = '';
try {
  cache = JSON.stringify(GLOBAL_CACHE, function replacer(key, value) {
    if (value instanceof Map) {
      // TODO: This probably should not be done here, but whatever lol.
      if (key === 'itemDrop') {
        return [...value.values()];
      }
      const results: Record<string, string> = {};
      for (const k of value.values()) {
        results[k.data.id] = JSON.stringify(k);
      }
      return results;
    } else {
      return value;
    }
  });
} catch (e) {
  console.log('Cache was not stringified properly. Exiting early.');
  throw e;
}

console.log('Writing stringified database to file');
try {
  fs.writeFileSync(path.resolve(__dirname, '../build.db'), cache, 'utf8');
} catch (e) {
  console.log('Could not write database to file. Exiting early.');
  throw e;
}
