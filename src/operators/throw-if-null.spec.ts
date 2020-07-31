import { cold } from 'jest-marbles';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { throwIfNull } from './throw-if-null';

describe('throwIfNull', () => {
  const error = 'error';

  it('should throw if value is null', () => {
    const input = cold('tu|', { t: true, u: null });
    const expected = cold('t#', { t: true }, error);

    const result = input.pipe(throwIfNull(() => error));

    expect(result).toBeObservable(expected);
  });

  it('should narrow null type', () => {
    const takesOnlyStrings = (s: string) => s;

    const value = 'value';
    const input = of(value as string | null);

    const result = input.pipe(
      throwIfNull(() => error),
      map(takesOnlyStrings)
    );

    expect(result).toBeObservable(cold('(v|)', { v: value }));
  });
});
