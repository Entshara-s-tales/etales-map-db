import { Line } from '../Line';

describe('Line class', () => {
  const TEST_STRING = 'set udg_CreepType[2]=1848651830 //Tester Lvl 82';

  it('creates instance with line and matcher property', () => {
    const line = TEST_STRING;
    const item = new Line(line, 'tests');
    expect(item.line).toEqual(line);
    expect(item.matcher).toEqual('tests');
  });

  it('properly sets data object', () => {
    const line = TEST_STRING;
    const item = new Line(line, 'tests');
    expect(item.data).toEqual({});
    const data = {
      name: 'kitten',
      id: 1234,
      objectId: 'test',
      level: 15,
    };
    item.setData(data);
    expect(item.data).toEqual(data);
  });

  it('properly serializes class to JSON', () => {
    const line = TEST_STRING;
    const item = new Line(line, 'tests');
    const data = {
      name: 'kitten',
      id: 1234,
      objectId: 'test',
      level: 15,
    };
    item.setData(data);
    expect(JSON.stringify(item)).toEqual(JSON.stringify(data));
  });
});
