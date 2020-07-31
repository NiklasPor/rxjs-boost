import { cold } from 'jest-marbles';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { throwIfUndefined } from './throw-if-undefined';

describe('throwIfUndefined', () => {
  const error = 'error';

  it('should throw if value is undefined', () => {
    const input = cold('tu|', { t: true, u: undefined });
    const expected = cold('t#', { t: true }, error);

    const result = input.pipe(throwIfUndefined(() => error));

    expect(result).toBeObservable(expected);
  });

  it('should narrow undefined type', () => {
    const takesOnlyStrings = (s: string) => s;

    const value = 'value';
    const input = of(value as string | undefined);

    const result = input.pipe(
      throwIfUndefined(() => error),
      map(takesOnlyStrings)
    );

    expect(result).toBeObservable(cold('(v|)', { v: value }));
  });
});
