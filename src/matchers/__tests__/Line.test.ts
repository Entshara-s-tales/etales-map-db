import { UnitMatcher } from '../UnitMatcher';
import { Line } from '../LineParser';

describe('UnitMatcher', () => {
  const TEST_STRING = 'set udg_CreepType[2]=1848651830 //Tester Lvl 82';

  it('properly initializes class for string with "lvl" ', () => {
    const line = TEST_STRING;
    const id = '2';
    const uuid = '1848651830';
    const nameWithLevel = 'Tester Lvl 82';
    const item = new Line(line, id, uuid, nameWithLevel, 'tests');
    expect(item.id).toEqual(2);
    expect(item.uuid).toEqual('1848651830');
    expect(item.name).toEqual('Tester');
    expect(item.level).toEqual(82);
  });

  it('properly serializes class to JSON', () => {
    const match = UnitMatcher.match(TEST_STRING);
    expect(match).not.toEqual(null);
    const item = new Line('testline', '1234', 'uuid', 'Name lvl 789', 'tests');
    expect(JSON.stringify(item)).toStrictEqual(
      JSON.stringify({
        id: 1234,
        name: 'Name',
        level: 789,
      })
    );
  });
});
