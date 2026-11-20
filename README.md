<a href="https://tsdotnet.github.io/observable-base/"><img src="https://cdn.jsdelivr.net/gh/tsdotnet/observable-base@master/assets/banner.svg" alt="@tsdotnet/observable-base: One source, many listeners. Observable base classes, no framework."></a>

[![npm version](https://img.shields.io/npm/v/@tsdotnet/observable-base.svg?style=flat-square)](https://www.npmjs.com/package/@tsdotnet/observable-base)
[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg?style=flat-square)](https://github.com/tsdotnet/observable-base/blob/master/LICENSE)

Base classes for observables: subscribe, emit to every subscriber, and dispose to unsubscribe.

## Install

```sh
npm install @tsdotnet/observable-base
```

## Usage

```ts
import { ObservableBase } from '@tsdotnet/observable-base';

class Ticker extends ObservableBase<number> {
	tick (n: number) { this._onNext(n); }
}

const ticker = new Ticker();
const sub = ticker.subscribe(n => console.log(n));
ticker.tick(1); // logs 1
sub.dispose();  // unsubscribe
ticker.tick(2); // nobody is listening
```

Subscribe with a callback or an `Observer` object (`onNext`, `onError`, `onCompleted`). Emit errors and completion with `_onError` and `_onCompleted`.

## Use it from

ESM (`import { ObservableBase } from '@tsdotnet/observable-base';`) or CommonJS (`const { ObservableBase } = require('@tsdotnet/observable-base');`).

<details><summary>In a browser, without a bundler</summary>

```html
<script src="https://cdn.jsdelivr.net/npm/@tsdotnet/type@1/dist/umd/type.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/@tsdotnet/compare@1/dist/umd/compare.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/@tsdotnet/exceptions@1/dist/umd/exceptions.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/@tsdotnet/collection-base@2/dist/umd/collection-base.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/@tsdotnet/disposable@2/dist/umd/disposable.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/@tsdotnet/linked-node-list@1/dist/umd/linked-node-list.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/@tsdotnet/ordered-registry@1/dist/umd/ordered-registry.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/@tsdotnet/observable-base@2/dist/umd/observable-base.min.js"></script>
<script>
  const { ObservableBase } = tsdotnet.observableBase;
</script>
```

</details>

## Docs

[tsdotnet.github.io/observable-base](https://tsdotnet.github.io/observable-base/)
