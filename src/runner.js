import Benchmark from 'benchmark';
import _ from 'underscore';

Benchmark.options.initCount = 3;

const isSame = (array1, array2) => {
  return array1.length === array2.length &&
         array1.every((element) => array2.includes(element));
}

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
        const allTestKeys = _.pluck(options.tests, 'title');
        const resultingTestKeys = this.filter('fastest').map('name');
        const text = resultingTestKeys.length === 1 ? 'Fastest is' : 'Fastest are';

        if (isSame(allTestKeys, resultingTestKeys)) {
          console.log('No winner. They are all (roughly) the same.');
          return;
        }

        console.log(`${text} "${resultingTestKeys.join(', ')}"!`);
      }
    });

    options.tests.forEach((testObj) => {
      this.suite.add(testObj.title, testObj.fn);
    })

    this.suite.run({'async': true});
  }
}
