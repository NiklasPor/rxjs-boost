import { EMPTY, from, isObservable, Observable, of } from 'rxjs';

function isPromise<T>(obj: any): obj is Promise<T> {
  return (
    !!obj &&
    (typeof obj === 'object' || typeof obj === 'function') &&
    typeof obj.then === 'function'
  );
}

/**
 * Wraps any value into an observable.
 *
 * - If the input is an Observable, the input is returned directly.
 * - If the input is a Promise, it is converted to an Observable.
 * - If the input is `null` or `undefined` an empty Observable is returned.
 * - Otherwise the input is simply wrapped into an Observable.
 *
 * @param input Input which will be wrapped into an Observable.
 * @returns Observable which wraps the input.
 */
export function wrapIntoObservable<T>(
  input: Promise<T> | Observable<T> | T | void
): Observable<T> {
  if (input === null || input === undefined) {
    return EMPTY;
  }

  if (isPromise<T>(input)) {
    return from(input);
  }

  if (isObservable(input)) {
    return input;
  }

  return of(input);
}
