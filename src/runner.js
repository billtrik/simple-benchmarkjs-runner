import Benchmark from 'benchmark';

Benchmark.options.initCount = 3;

export default class BenchmarkRunner {
  constructor(options) {
    options = options || {};

    this.suite = new Benchmark.Suite(options.title, {
      'onStart': () => {
        if (options.title) {
          console.log(`Starting benchmark: "${options.title}"`);
        }
      },
      'onCycle': (event) => {
        console.log(String(event.target));
      },
      'onError': (event) => {
        console.log('Error:', String(event.target.error));
      },
      'onComplete': function () {
        console.log('Fastest is ' + this.filter('fastest').map('name'));
      }
    });

    options.tests.forEach((testObj) => {
      this.suite.add(testObj.title, testObj.fn);
    })

    this.suite.run({'async': true});
  }
}
