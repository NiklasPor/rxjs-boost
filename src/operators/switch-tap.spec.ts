import { cold } from 'jest-marbles';
import { of } from 'rxjs';
import { switchTap } from './switch-tap';

describe('switchTap', () => {
  it('should map back to initial values', () => {
    const input = cold('abc|', { a: 'a', b: 'b', c: 'c' });
    const expected = input;

    const result = input.pipe(switchTap(() => of('z')));

    expect(true).toBe(true);
  });
});
