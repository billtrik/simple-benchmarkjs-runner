simple-benchmarkjs-runner [![NPM version](https://badge.fury.io/js/simple-benchmarkjs-runner.svg)](http://badge.fury.io/js/simple-benchmarkjs-runner)
=============

A simple runner for [benchmark.js](https://benchmarkjs.com/).
It abstracts the benchmark.js API and provides a config-like way to execute your benchmarking.

Installation
------------

Install the lib:

```sh
$ npm install simple-benchmarkjs-runner --save-dev
```

Require and use it in your code:

```javascript
import BenchmarkRunner from 'simple-benchmarkjs-runner';
import impl1 from './implementations/first';
import impl2 from './implementations/second';

new BenchmarkRunner({
  title: 'benchmark-suite-title',
  tests: [
    {
      title: 'Implementation 1',
      fn: () => impl1()
    },
    {
      title: 'Implementation 2',
      fn: () => impl2()
    }
  ]
});
```

It will benchmark the different implementations and it will output some stats:
```
Implementation 1 x 13,244 ops/sec ±6.60% (66 runs sampled)
Implementation 2 x 15,724 ops/sec ±3.05% (83 runs sampled)
Fastest is Implementation 2
```

Execution
---------
To run a benchmark from the command line
```
./node_modules/.bin/babel-node [path-to-your-file].js
```
In case you don't have `babel-node` installed as a dependency run `npm install babel-cli --save-dev`

License
-------

The MIT License (MIT)
