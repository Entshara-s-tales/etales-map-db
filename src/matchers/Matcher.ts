export abstract class MatcherResult {
	line: string;
	constructor(line: string) {
		this.line = line;
	}
}

export interface Matcher {
	name: string;
	match: (line: string) => RegExpMatchArray | null;
	factory: (...groups: any[]) => MatcherResult;
}

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
