import { splitNameFromLevel } from '../Matcher';

describe('splitNameFromLevel', () => {
	it('properly splits for string with "lvl" ', () => {
		const testString = 'Stick Bead lvl 5403" )';
		const [name, level] = splitNameFromLevel(testString);
		expect(name).toEqual('Stick Bead');
		expect(level).toEqual(5403);
	});
	it('properly splits for string with "lev" ', () => {
		const testString = 'Stick Bead lev 5403" )';
		const [name, level] = splitNameFromLevel(testString);
		expect(name).toEqual('Stick Bead');
		expect(level).toEqual(5403);
	});
	it('properly splits for string with "level" ', () => {
		const testString = 'Stick Bead level 5403" )';
		const [name, level] = splitNameFromLevel(testString);
		expect(name).toEqual('Stick Bead');
		expect(level).toEqual(5403);
	});
	it('properly splits for string with without any levels', () => {
		const testString = ' Legendary Solvek abyss tear';
		const [name, level] = splitNameFromLevel(testString);
		expect(name).toEqual('Legendary Solvek abyss tear');
		expect(level).toEqual(undefined);
	});

	it('properly splits for string with without level indicator ', () => {
		const testString = ' Abomination 75';
		const [name, level] = splitNameFromLevel(testString);
		expect(name).toEqual('Abomination');
		expect(level).toEqual(75);
	});
});
