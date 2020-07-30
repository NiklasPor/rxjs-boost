import { from, MonoTypeOperatorFunction, ObservableInput } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

export function switchTap<T, O extends ObservableInput<any>>(
  project: (value: T, index: number) => O
): MonoTypeOperatorFunction<T> {
  return switchMap((value, index) =>
    from(project(value, index)).pipe(map(() => value))
  );
}
