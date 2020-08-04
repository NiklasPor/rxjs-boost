import {
  Observable,
  ObservableInput,
  ObservedValueOf,
  OperatorFunction,
} from 'rxjs';
import { catchError } from 'rxjs/operators';

/**
 * Catches an error if [conditionFn] evaluates to be truthy.
 * If the error is catched, the original observable sequence will be replaced with the result of [selectorFn].
 *
 * @param conditionFn Determines if an error should be catched.
 * @param selectorFn Selector which provides a new observable.
 *                   The newly provided observable will continue the observable chain.
 *
 * @example
 * ```
 * // Example with condition evaluating to `true`:
 * const source =      cold('v#');
 * const replacement = cold('r|');
 *
 * const expected =    cold('vr|');
 *
 * const result = source.pipe(
 *   catchIf(
 *     () => true,
 *     () => replacement
 *   )
 * );
 *
 * // Example with condition evaluating to `false`:
 * const source =      cold('v#');
 * const replacement = cold('r|');
 *
 * const expected =    cold('v#');
 *
 * const result = source.pipe(
 *   catchIf(
 *     () => false,
 *     () => replacement
 *   )
 * );
 *
 * ```
 */
export function catchIf<T, O extends ObservableInput<any>>(
  conditionFn: (error: any) => boolean,
  selectorFn: (error: any) => O
): OperatorFunction<T, T | ObservedValueOf<O>> {
  return (input: Observable<T>) =>
    input.pipe(
      catchError((error) => {
        if (conditionFn(error)) {
          return selectorFn(error);
        }

        throw error;
      })
    );
}
