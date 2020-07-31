import { OperatorFunction } from 'rxjs';
import { map } from 'rxjs/operators';

/**
 * Throws the error built by `errorFn` if the current value is `null`.
 * Performs type narrowing and removes null from your value type.
 *
 * @param errorFn Evaluates to the error which can be thrown.
 *
 * @example
 * ```
 * const input = of(value as string | null);
 *
 * const result = input.pipe(
 *   map(v => v) // typeof v = string | null
 *   throwIfNull(() => 'error'),
 *   map(v => v) // typeof v = string
 * );
 * ```
 */
export function throwIfNull<T>(
  errorFn: (value: T, index: number) => any
): OperatorFunction<T, Exclude<T, null>> {
  return (input) =>
    input.pipe(
      map((value, index) => {
        if (value === null) {
          throw errorFn(value, index);
        }

        return value as Exclude<T, null>;
      })
    );
}
