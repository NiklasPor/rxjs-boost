import {
  combineLatest,
  MonoTypeOperatorFunction,
  ObservableInput,
  of,
} from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

/**
 * Behaves exactly like `switchMap`, except that it maps all values back to the initial value.
 * @param project Projection function which returns the inner observable.
 */
export function switchTap<T, O extends ObservableInput<any>>(
  project: (value: T, index: number) => O
): MonoTypeOperatorFunction<T> {
  return (input) =>
    input.pipe(
      switchMap((value, index) =>
        combineLatest(of(value), project(value, index))
      ),
      map(([intialValue]) => intialValue)
    );
}
