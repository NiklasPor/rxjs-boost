# RxJs Boost

[![npm](https://img.shields.io/npm/v/rxjs-boost)](https://www.npmjs.com/package/rxjs-boost)
[![docs](https://img.shields.io/badge/docs-rxjs--boost.vercel.app-blueviolet)](https://rxjs-boost.vercel.app/)
[![codecov](https://codecov.io/gh/NiklasPor/rxjs-boost/branch/master/graph/badge.svg)](https://codecov.io/gh/NiklasPor/rxjs-boost)
[![license](https://img.shields.io/github/license/niklaspor/rxjs-boost)](https://github.com/NiklasPor/rxjs-boost)

Fire up your RxJS experience to a new level 🔥

---

Visit the [official documentation](https://rxjs-boost.vercel.app) and have a look at the collection of operators and utils. Or get started with one of the few below:

- [catchIf](https://rxjs-boost.vercel.app/modules/_catch_if_.html)
- [retryWithDelay](https://rxjs-boost.vercel.app/modules/_retry_with_delay_.html)
- [switchTap](https://rxjs-boost.vercel.app/modules/_switch_tap_.html)
- [throwIf](https://rxjs-boost.vercel.app/modules/_throw_if_.html)
- [throwIfNull](https://rxjs-boost.vercel.app/modules/_throw_if_null_.html)
- [throwIfUndefined](https://rxjs-boost.vercel.app/modules/_throw_if_undefined_.html)

## Installation

```
npm i rxjs-boost
```

```ts
import { wrapIntoObservable } from 'rxjs-boost';
import { retryWithDelay, switchTap, throwIf } from 'rxjs-boost/operators';
```

## FAQ

- Why are there `throwIf`, `throwIfNull` and `throwIfUndefined` – isn't one of them enough?
  - When strict null checks are enabled, TypeScript doesn't include `null` and `undefined` in all other types. Therefore you'll want to narrow down the type inside your observable pipe. The example of `throwIfNull` inside the [documentation](https://rxjs-boost.vercel.app/modules/_throw_if_null_.html) also displays this.
- I've got an idea of a super cool, not overloaded operator – where can I submit it?
  - Just open an issue. There is no template yet :)
