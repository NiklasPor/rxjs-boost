import { cold } from 'jest-marbles';
import { switchTap } from './switch-tap';

describe('switchTap', () => {
  it('should map back to initial values', () => {
    const input = cold('abc|', { a: 'a', b: 'b', c: 'c' });
    const expected = input;

    const result = input.pipe(switchTap(() => cold('z|', { z: 'z' })));

    expect(result).toBeObservable(expected);
  });
});
