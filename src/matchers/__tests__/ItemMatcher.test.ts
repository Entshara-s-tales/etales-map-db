import { ItemMatcher } from '../ItemMatcher';

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
});
