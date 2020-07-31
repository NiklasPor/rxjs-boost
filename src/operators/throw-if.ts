import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

/**
 * Throws the error built by `errorFn` if `conditionFn` evaluates to be truthy.
 *
 * @param conditionFn Determines if an error should be thrown.
 * @param errorFn Evaluates to the error which can be thrown.
 */
export function throwIf<T>(
  conditionFn: (value: T, index: number) => boolean,
  errorFn: (value: T, index: number) => any
) {
  return (input: Observable<T>) =>
    input.pipe(
      map((value, index) => {
        if (conditionFn(value, index)) {
          throw errorFn(value, index);
        }

        return value;
      })
    );
}
