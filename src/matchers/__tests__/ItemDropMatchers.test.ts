import { ItemDropMatcher } from '../ItemDropMatchers';

describe('ItemDropMatcher', () => {
  const TEST_STRING =
    'call SetUnitDrop(1 , 73 , 1000 , 0 , 928 , 0 , 0 , 0 , 88)';
  const TEST_STRING_2 =
    'call SetUnitDrop(250 , 90 , 0 , 87 , 0 , 353 , 819 , 86 , 88)';
  it('matches drop items', () => {
    const match = ItemDropMatcher.match(TEST_STRING);
    expect(match).not.toEqual(null);
    expect(match![0]).toEqual(TEST_STRING);
    const match2 = ItemDropMatcher.match(TEST_STRING_2);
    expect(match2).not.toEqual(null);
    expect(match2![0]).toEqual(TEST_STRING_2);
  });
});
