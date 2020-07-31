import { cold } from 'jest-marbles';
import { throwIf } from './throw-if';

describe('throwIf', () => {
  const error = 'error';

  it('should throw if condition evaluates to true', () => {
    const input = cold('ftf|', { t: true, f: false });
    const expected = cold('f#', { f: false }, error);

    const result = input.pipe(
      throwIf(
        (val) => val,
        () => error
      )
    );

    expect(result).toBeObservable(expected);
  });
});
