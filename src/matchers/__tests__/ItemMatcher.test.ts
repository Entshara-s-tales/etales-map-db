import { Item, ItemMatcher } from '../Item';

describe('ItemMatcher', () => {
	const TEST_STRING =
		'set udg_itmpool[986]=1227901255 //Stick Bead lvl 5403" )';
	it('properly matches item string', () => {
		const match = ItemMatcher.match(TEST_STRING);
		expect(match).not.toEqual(null);
		const [line, id, uuid, rest] = match!;
		expect(line).toEqual(TEST_STRING);
		expect(id).toEqual('986');
		expect(uuid).toEqual('1227901255');
		expect(rest).toEqual('Stick Bead lvl 5403" )');
	});

	it('properly initializes class for string with "lvl" ', () => {
		const testString =
			'set udg_itmpool[986]=1227901255 //Stick Bead lvl 5403" )';
		const match = ItemMatcher.match(testString);
		expect(match).not.toEqual(null);
		const item = ItemMatcher.factory(...match!) as Item;
		expect(item.id).toEqual(986);
		expect(item.uuid).toEqual('1227901255');
		expect(item.name).toEqual('Stick Bead');
		expect(item.level).toEqual(5403);
	});

	it('properly serializes class to JSON', () => {
		const testString =
			'set udg_itmpool[986]=1227901255 //Stick Bead lvl 5403" )';
		const match = ItemMatcher.match(testString);
		expect(match).not.toEqual(null);
		const item = ItemMatcher.factory(
			'testline',
			'1234',
			'uuid',
			'Name lvl 789'
		) as Item;
		expect(JSON.stringify(item)).toStrictEqual(
			JSON.stringify({
				id: 1234,
				name: 'Name',
				level: 789,
			})
		);
	});
});
