import Benchmark from 'benchmark';
import _ from 'underscore';

Benchmark.options.initCount = 3;

const isSame = (array1, array2) => {
  return array1.length === array2.length &&
         array1.every((element) => array2.includes(element));
}

export default class BenchmarkRunner {
  constructor(suites) {
    if (!suites) {
      throw Error('You should pass sth');
    }

    if (!_.isArray(suites)) {
      suites = [suites];
    }

    suites.forEach((suite) => this.runSuite(suite))
  }

  runSuite(suite) {
    const instance = new Benchmark.Suite(suite.title, {
      'onStart': () => {
        if (suite.title) {
          console.log(`Starting benchmark: "${suite.title}"`);
        }
      },
      'onCycle': (event) => {
        console.log(String(event.target));
      },
      'onError': (event) => {
        console.log('Error:', String(event.target.error));
      },
      'onComplete': function () {
        const allTestKeys = _.pluck(suite.tests, 'title');
        const resultingTestKeys = this.filter('fastest').map('name');
        const text = resultingTestKeys.length === 1 ? 'Fastest is' : 'Fastest are';

        if (isSame(allTestKeys, resultingTestKeys)) {
          console.log('No winner. They are all (roughly) the same.');
          return;
        }

        console.log(`${text} "${resultingTestKeys.join(', ')}"!`);
      }
    });

    suite.tests.forEach((testObj) => {
      instance.add(testObj.title, testObj.fn);
    })

    instance.run();
  }
}
