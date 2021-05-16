import {
  ItemMatcher,
  HeroMatcher,
  UnitMatcher,
  gameObjectFactory,
  splitNameFromLevel,
} from '../GameObjectMatchers';

describe('GameObjectMatchers utils', () => {
  it('splitNameFromLevel should properly translate item string', () => {
    const TEST_STRING = "Stick Bead lvl 5403 )'";
    const [name, level] = splitNameFromLevel(TEST_STRING);
    expect(name).toEqual('Stick Bead');
    expect(level).toEqual(5403);
  });
  it('splitNameFromLevel should properly translate unit string with level writen as "lev"', () => {
    const TEST_STRING = 'Servant lev 50';
    const [name, level] = splitNameFromLevel(TEST_STRING);
    expect(name).toEqual('Servant');
    expect(level).toEqual(50);
  });
  it('splitNameFromLevel should properly translate unit string with level written as "lvl"', () => {
    const TEST_STRING = 'Centaur Outrunner Lvl 28';
    const [name, level] = splitNameFromLevel(TEST_STRING);
    expect(name).toEqual('Centaur Outrunner');
    expect(level).toEqual(28);
  });
  it('splitNameFromLevel should properly translate unit string with level written as "level"', () => {
    const TEST_STRING = 'Returned level 23';
    const [name, level] = splitNameFromLevel(TEST_STRING);
    expect(name).toEqual('Returned');
    expect(level).toEqual(23);
  });

  it('splitNameFromLevel should account BOSS suffix as part of the name', () => {
    const TEST_STRING = 'Magnataur Destroyer BOSS lev 58';
    const [name, level] = splitNameFromLevel(TEST_STRING);
    expect(name).toEqual('Magnataur Destroyer BOSS');
    expect(level).toEqual(58);
  });

  it('splitNameFromLevel should account (BOSS) suffix as part of the name', () => {
    const TEST_STRING = 'Bansee (BOSS)';
    const [name, level] = splitNameFromLevel(TEST_STRING);
    expect(name).toEqual('Bansee (BOSS)');
    expect(level).toEqual(undefined);
  });
});

describe('GameObjectMatchers factory', () => {
  it('should use the same factory for all GameObjectMatchers', () => {
    expect(ItemMatcher.factory).toEqual(gameObjectFactory);
    expect(HeroMatcher.factory).toEqual(gameObjectFactory);
    expect(UnitMatcher.factory).toEqual(gameObjectFactory);
  });
  it('should get return a data object with keys of [name, id, objectId, level]', () => {
    const TEST_STRING =
      'set udg_itmpool[986]=1227901255 //Stick Bead lvl 5403" )';
    const matches = ItemMatcher.match(TEST_STRING);
    expect(matches).not.toEqual(null);
    const dataObject = gameObjectFactory(matches!);
    expect(dataObject).toEqual({
      id: 986,
      objectId: '1227901255',
      name: 'Stick Bead',
      level: 5403,
    });
  });
});

describe('ItemMatcher', () => {
  const TEST_STRING =
    'set udg_itmpool[986]=1227901255 //Stick Bead lvl 5403" )';
  it('properly matches item string', () => {
    const match = ItemMatcher.match(TEST_STRING);
    expect(match).not.toEqual(null);
    const [line, id, objectId, rest] = match!;
    expect(line).toEqual(TEST_STRING);
    expect(id).toEqual('986');
    expect(objectId).toEqual('1227901255');
    expect(rest).toEqual('Stick Bead lvl 5403" )');
  });
});

describe('UnitMatcher', () => {
  it('properly matches teststring with "lvl"', () => {
    const testString = 'set udg_CreepType[2]=1848651830 //Tester Lvl 82';
    const match = UnitMatcher.match(testString);
    expect(match).not.toEqual(null);
    const [line, id, objectId, rest] = match!;
    expect(line).toEqual(testString);
    expect(id).toEqual('2');
    expect(objectId).toEqual('1848651830');
    expect(rest).toEqual('Tester Lvl 82');
  });
  it('properly matches teststring with "level"', () => {
    const testString = "set udg_CreepType[102]='n03D' //Returned level 23";
    const match = UnitMatcher.match(testString);
    expect(match).not.toEqual(null);
    const [line, id, objectId, rest] = match!;
    expect(line).toEqual(testString);
    expect(id).toEqual('102');
    expect(objectId).toEqual('n03D');
    expect(rest).toEqual('Returned level 23');
  });
  it('properly matches teststring with "lev"', () => {
    const testString = "set udg_CreepType[110]='n03Q' //Bandit Lord Lev 52";
    const match = UnitMatcher.match(testString);
    expect(match).not.toEqual(null);
    const [line, id, objectId, rest] = match!;
    expect(line).toEqual(testString);
    expect(id).toEqual('110');
    expect(objectId).toEqual('n03Q');
    expect(rest).toEqual('Bandit Lord Lev 52');
  });
});

describe('HeroMatcher', () => {
  it('properly matches hero strings', () => {
    const testString = "set udg_HeroPool[1]='N009' //Dark Ranger";
    const match = HeroMatcher.match(testString);
    expect(match).not.toEqual(null);
    const [line, id, objectId, rest] = match!;
    expect(line).toEqual(testString);
    expect(id).toEqual('1');
    expect(objectId).toEqual('N009');
    expect(rest).toEqual('Dark Ranger');
  });
});
