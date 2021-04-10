import { Matcher, MatcherResult, splitNameFromLevel } from './Matcher';

export const GlobalItemCache: Map<number, Item> = new Map();

export class Item extends MatcherResult {
	id: number;
	uuid: string;
	name: string;
	level?: number;

	constructor(line: string, id: string, uuid: string, nameWithLevel: string) {
		super(line);
		this.id = parseInt(id, 10);
		this.uuid = uuid.replaceAll("'", '');
		const [name, level] = splitNameFromLevel(nameWithLevel);

		this.name = name;
		this.level = level;

		// TODO: Check for duplicates
		GlobalItemCache.set(this.id, this);
	}

	toJSON() {
		return {
			id: this.id,
			name: this.name,
			// uuid: this.uuid,
			level: this.level,
		};
	}
}

const itemRe = /set udg_itmpool\[(.*)\]=(.*) * \/\/(.*)/;

export const ItemMatcher: Matcher = {
	name: 'item',
	match: x => x.match(itemRe),
	factory: (line: string, id: string, uuid: string, name: string) =>
		new Item(line, id, uuid, name),
};
