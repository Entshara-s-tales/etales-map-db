import { UnitMatcher } from '../UnitMatcher';

describe('UnitMatcher', () => {
  it('properly matches teststring with "lvl"', () => {
    const testString = 'set udg_CreepType[2]=1848651830 //Tester Lvl 82';
    const match = UnitMatcher.match(testString);
    expect(match).not.toEqual(null);
    const [line, id, uuid, rest] = match!;
    expect(line).toEqual(testString);
    expect(id).toEqual('2');
    expect(uuid).toEqual('1848651830');
    expect(rest).toEqual('Tester Lvl 82');
  });
  it('properly matches teststring with "level"', () => {
    const testString = "set udg_CreepType[102]='n03D' //Returned level 23";
    const match = UnitMatcher.match(testString);
    expect(match).not.toEqual(null);
    const [line, id, uuid, rest] = match!;
    expect(line).toEqual(testString);
    expect(id).toEqual('102');
    expect(uuid).toEqual('n03D');
    expect(rest).toEqual('Returned level 23');
  });
  it('properly matches teststring with "lev"', () => {
    const testString = "set udg_CreepType[110]='n03Q' //Bandit Lord Lev 52";
    const match = UnitMatcher.match(testString);
    expect(match).not.toEqual(null);
    const [line, id, uuid, rest] = match!;
    expect(line).toEqual(testString);
    expect(id).toEqual('110');
    expect(uuid).toEqual('n03Q');
    expect(rest).toEqual('Bandit Lord Lev 52');
  });
});
