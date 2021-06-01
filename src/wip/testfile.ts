// import path from 'path';
// import fs from 'fs';
// import { ItemDropMatcher } from './matchers/ItemDropMatchers';
// import { Matchers } from './matchers/Matcher';
// import {
//   HeroMatcher,
//   ItemMatcher,
//   UnitMatcher,
// } from './matchers/GameObjectMatchers';
// import { GLOBAL_CACHE, serialize } from './Cache';
// import { matchStringsLines, WC3String } from './matchers/StringMatcher';
// import { Line } from './matchers/Line';

// const DEBUG = false;

// function getJassLines() {
//   const mapfile = path.resolve(__dirname, '../scripts.j');
//   if (fs.existsSync(mapfile)) {
//     console.log(`Found mapfile at ${mapfile}.`);
//   }
//   console.log(`Reading map.`);
//   const scripts = fs.readFileSync(mapfile, 'utf8');

//   console.log(`Splitting into lines.`);
//   const lines = scripts.split('\n');

//   console.log(`${lines.length} lines of JASS code found.`);
//   return lines;
// }

// function matchJassLines(lines: string[]) {
//   const matchers = new Matchers<RegExpMatchArray>();
//   matchers.registerAll([
//     HeroMatcher,
//     ItemMatcher,
//     UnitMatcher,
//     ItemDropMatcher,
//   ]);

//   for (const line of lines) {
//     const l = matchers.match(line);
//     if (l && DEBUG) {
//       console.log(`Matcher: "${l.matcher}", line: "${line}"`);
//     }
//   }
// }

// function writeToFile(cache: string) {
//   console.log('Writing stringified database to file');
//   try {
//     fs.writeFileSync(path.resolve(__dirname, '../build.db'), cache, 'utf8');
//   } catch (e) {
//     console.log('Could not write database to file. Exiting early.');
//     throw e;
//   }
// }

// function getStringsFile() {
//   const stringsFile = path.resolve(__dirname, '../strings.wts');
//   if (fs.existsSync(stringsFile)) {
//     console.log(`Found stringsFile at ${stringsFile}.`);
//   }
//   console.log(`Reading map.`);
//   const strings = fs.readFileSync(stringsFile, 'utf8');
//   return strings;
// }

// function main() {
//   // const jassLines = getJassLines();
//   // matchJassLines(jassLines);

//   const strings = getStringsFile();
//   const lines = matchStringsLines(strings);
//   const items: Line<WC3String>[] = lines.filter(
//     x => x?.data?.object?.type === 'item'
//   );

// const grouped = groupBy((i: Line<WC3String>) => i?.data?.object?.id)(items);

// const grouped = groupBy(items, (i) =>
//   i?.data?.object?.where.replace(/ (\(.*\))/, "")
// ) as WC3StringGroupedCollection;

//   // const cache = serialize();
//   // writeToFile(cache);
// }

// main();

// type ItemObject = {
//   name: string;
//   description: string;
//   ubertip: string;
// };

// function getValue(lines: Line<WC3String>[] = []) {
//   if (lines.length > 0) {
//     return lines[0].data?.text;
//   }
//   return undefined;
// }

// function getDefaultName(lines: Line<WC3String>[] = []) {
//   if (lines.length > 0) {
//     return lines[0].data?.object?.name;
//   }
//   return undefined;
// }

// type ItemObject = {
//   name: string;
//   description: string;
//   ubertip: string;
// };

// function mapGroupedByIdItems(grouped: Record<string, Line<WC3String>[]>) {
//   const group = groupBy((line: Line<WC3String>) =>
//     line.data?.object?.where.replace(/ (\(.*\))/, "").toLowerCase()
//   );
//   const keys = Object.keys(grouped);
//   const result: Record<string, Partial<ItemObject>> = {};
//   for (const key of keys) {
//     const items = grouped[key];
//     const labelGrouped = group(items);
//     const { name, description, ubertip } = labelGrouped;
//     result[key] = {
//       name:
//         getValue(name) ||
//         getDefaultName(description) ||
//         getDefaultName(ubertip),
//       description: getValue(description) || getValue(ubertip),
//     };
//   }
//   return result;
// }
