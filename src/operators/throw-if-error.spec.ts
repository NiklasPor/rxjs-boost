import { cold } from 'jest-marbles';
import { throwIfError } from './throw-if-error';

describe('throwIf', () => {
  const error = Error('Some error.');

  it('should throw if projection evaluates to an error', () => {
    const input = cold('   au|', { a: 'a', u: undefined });
    const expected = cold('a#', { a: 'a' }, error);

    const result = input.pipe(throwIfError((value) => value ?? error));

    expect(result).toBeObservable(expected);
  });

  it('should throw (without projection) if an error value occurs', () => {
    const input = cold('ae|', { a: 'a', e: error });
    const expected = cold('a#', { a: 'a' }, error);

    const result = input.pipe(throwIfError());

    expect(result).toBeObservable(expected);
  });
});
