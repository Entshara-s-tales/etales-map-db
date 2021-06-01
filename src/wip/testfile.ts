import * as path from "path";
import * as fs from "fs";
// import { ItemDropMatcher } from "./matchers/ItemDropMatchers";
// import { Matchers } from "./matchers/Matcher";
// import {
//   HeroMatcher,
//   ItemMatcher,
//   UnitMatcher,
// } from "./matchers/GameObjectMatchers";
// import { GLOBAL_CACHE, serialize } from "./Cache";
import {
  formatStringsDataDump,
  matchStringsLines,
  WC3String,
} from "../matchers/StringMatcher";
import { Line } from "../matchers/Line";
import { groupBy } from "lodash/fp";

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

function getStringsFile() {
  const stringsFile = path.resolve(__dirname, "../../mapfile/war3map.wts");
  if (fs.existsSync(stringsFile)) {
    console.log(`Found stringsFile at ${stringsFile}.`);
  }
  console.log(`Reading map.`);
  const strings = fs.readFileSync(stringsFile, "utf8");
  return strings;
}

function main() {
  // const jassLines = getJassLines();
  // matchJassLines(jassLines);

  const strings = getStringsFile();
  const lines = matchStringsLines(strings);
  const items: Line<WC3String>[] = lines.filter(
    (x) => x?.data?.object?.type === "item"
  );

  const mapped = formatStringsDataDump(items);
  console.log(mapped);
  // const cache = serialize();
  // writeToFile(cache);
}

main();
