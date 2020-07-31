import { OperatorFunction } from 'rxjs';
import { map } from 'rxjs/operators';

/**
 * Throws the error built by `errorFn` if the current value is `undefined`.
 * Performs type narrowing and removes undefined from your value type.
 *
 * @param errorFn Evaluates to the error which can be thrown.
 *
 * @example
 * ```
 * const input = of(value as string | undefined);
 *
 * const result = input.pipe(
 *    throwIfUndefined(() => error),
 *     map(takesOnlyStrings)
 *  );
 * ```
 */
export function throwIfUndefined<T>(
  errorFn: (value: T, index: number) => any
): OperatorFunction<T, Exclude<T, undefined>> {
  return (input) =>
    input.pipe(
      map((value, index) => {
        if (value === undefined) {
          throw errorFn(value, index);
        }

        return value as Exclude<T, undefined>;
      })
    );
}
