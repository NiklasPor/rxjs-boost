import { cold } from 'jest-marbles';
import { iif } from 'rxjs';
import { configure } from 'rxjs-marbles';
import { retryWithDelay } from './retry-with-delay';

const { marbles } = configure({ run: false });

const error = 'error';

describe('retryWithDelay', () => {
  it('should not change observable without errors', () => {
    const input = cold('a-b-|', { a: 'a', b: 'b' });

    const expected = input;
    const result = input.pipe(retryWithDelay(1000, 20));

    expect(result).toBeObservable(expected);
  });

  it(
    'should never retry with a count of 0',
    marbles((m) => {
      m.bind();

      const count = 0;
      const delay = m.time('--|');

      const source = m.cold('#', {}, error);
      const expected = m.cold('#', {}, error);

      const result = source.pipe(retryWithDelay(delay, count));

      m.expect(result).toBeObservable(expected);
    })
  );

  it(
    'should retry [count] times with delay of [delay]',
    marbles((m) => {
      m.bind();

      const count = 3;
      const delay = m.time('--|');

      const source = m.cold('#', {}, error);

      // expect to be delayed by: 2 (delay) * 3 (count)
      const expected = m.cold('------#', {}, error);

      const result = source.pipe(retryWithDelay(delay, count));

      m.expect(result).toBeObservable(expected);
    })
  );

  it(
    'amount of retries should default to 1',
    marbles((m) => {
      m.bind();
      const delay = m.time('--|');

      const source = m.cold('#', {}, error);

      // expect to be delayed by: 2 (delay) * 1 (count)
      const expected = m.cold('--#', {}, error);

      const result = source.pipe(retryWithDelay(delay));

      m.expect(result).toBeObservable(expected);
    })
  );

  it(
    'resubscribe each time',
    marbles((m) => {
      let firstCall = true;

      m.bind();

      const count = 1;
      const delay = m.time('-|');

      const source = iif(
        () => {
          const condition = firstCall;
          firstCall = false;
          return condition;
        },
        m.cold('--#', {}, error),
        m.cold('--a', { a: 'a' })
      );

      // expect a to be delayed by: 2 (before first error) + 1 (delay) + 2 (before first value)
      const expected = m.cold('-----a', { a: 'a' });

      const result = source.pipe(retryWithDelay(delay, count));

      m.expect(result).toBeObservable(expected);
    })
  );
});
