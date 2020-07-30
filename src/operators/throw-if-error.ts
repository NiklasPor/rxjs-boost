import { OperatorFunction } from 'rxjs';
import { map } from 'rxjs/operators';

/**
 * Throws the passed value as an error, if it evaluates `value instanceof Error` to true.
 * @param project A projection function, which will be performed on the value. Similar to `map`. The result is used for the conditional throw of the Error.
 *
 * @example
 * const input = cold('au|', {a: 'a', u: undefined}).pipe(
 *   // Will throw if value is undefined or null:
 *   throwIfError(value => value ?? Error('Value must be defined'))
 * )
 *
 * const result = cold('a#', {a: 'a'})
 */
export function throwIfError<T, R = T>(
  project?: (value: T, index: number) => R
): OperatorFunction<T, Exclude<R, Error>> {
  return map((value, index) => {
    const mappedValue = project ? project(value, index) : value;

    if (mappedValue instanceof Error) {
      throw mappedValue;
    } else {
      return mappedValue as Exclude<R, Error>;
    }
  });
}
