import path from 'path';
import fs from 'fs';
import { ItemMatcher } from './matchers/Item';
import type { Matcher } from './matchers/Matcher';

const mapfile = path.resolve(__dirname, '../scripts.j');
if (fs.existsSync(mapfile)) {
	console.log(`Found mapfile at ${mapfile}.`);
}
console.log(`Reading map.`);
const scripts = fs.readFileSync(mapfile, 'utf8');

console.log(`Splitting into lines.`);
const lines = scripts.split('\n');

console.log(`${lines.length} lines of JASS code found.`);

const z = ItemMatcher;
console.log(z);

const matched: Record<Matcher['name'], any> = {};
export const matchers: Matcher[] = [ItemMatcher];

for (const matcher of matchers) {
	matched[matcher.name] = {};
}

for (const line of lines) {
	for (const matcher of matchers) {
		const matched = matcher.match(line);
		if (matched !== null) {
			const item = matcher.factory(...matched);
			console.log(item);
		}
	}
}
