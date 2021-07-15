import { cold } from 'jest-marbles';
import { wrapIntoObservable } from './wrap-into-observable';
describe('wrapIntoObservable', () => {
  it('should wrap everything else', () => {
    const input = 'a';
    const expected = cold('(a|)');

    const result = wrapIntoObservable(input);

    expect(result).toBeObservable(expected);
  });

  it('should not wrap observables', () => {
    const input = cold('a|');
    const expected = input;

    const result = wrapIntoObservable(input);

    expect(result).toBe(expected);
  });
});
