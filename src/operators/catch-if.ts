import {
  Observable,
  ObservableInput,
  ObservedValueOf,
  OperatorFunction,
} from 'rxjs';
import { catchError } from 'rxjs/operators';

/**
 * Catches an error if [conditionFn] evaluates to be truthy.
 * If the error is catched, it is
 *
 * @param conditionFn Determines if an error should be catched.
 * @param selectorFn Selector which provides a new observable.
 *                   The newly provided Observable will continue the observable chain.
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
