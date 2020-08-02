import { cold } from 'jest-marbles';
import { of } from 'rxjs';
import { catchIf } from './catch-if';

const error = 'error';
const value = 'value';

describe('catchIf', () => {
  it('should catch & map observable if condition evaluates to true', () => {
    const source = cold('v#', { v: value }, error);
    const replacement = cold('v|', { v: value });

    const expected = cold('vv|', { v: value });

    const result = source.pipe(
      catchIf(
        () => true,
        () => replacement
      )
    );

    expect(result).toBeObservable(expected);
  });

  it('should throw initial error if condition evaluates to false', () => {
    const source = cold('v#', { v: value }, error);

    const expected = cold('v#', { v: value }, error);

    const result = source.pipe(
      catchIf(
        () => false,
        () => of()
      )
    );

    expect(result).toBeObservable(expected);
  });
});
