Excess Kurtosis
===
[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Coverage Status][coveralls-image]][coveralls-url] [![Dependencies][dependencies-image]][dependencies-url]

> Computes the sample excess kurtosis of an array of values.


## Installation

``` bash
$ npm install compute-kurtosis
```

For use in the browser, use [browserify](https://github.com/substack/node-browserify).


## Usage

To use the module,

``` javascript
var kurtosis = require( 'compute-kurtosis' );
```


## Examples

``` javascript
var data = new Array( 100 );

for ( var i = 0; i < data.length; i++ ) {
	data[ i ] = Math.random()*100;
}

console.log( kurtosis( data ) );
// A uniform distribution should have an excess kurtosis around -1.2.
```

To run the example code from the top-level application directory,

``` bash
$ node ./examples/index.js
```


## Notes

The formula for computing the sample excess kurtosis comes from

> Jones and Gill (1998). Comparing measures of sample skewness and kurtosis. _The Statistician_. [DOI: 10.1111/1467-9884.00122](http://onlinelibrary.wiley.com/doi/10.1111/1467-9884.00122/)

The test data comes from [Measures of Shape: Skewness and Kurtosis](http://www.tc3.edu/instruct/sbrown/stat/shape.htm) by Stan Brown.



## Tests

### Unit

Unit tests use the [Mocha](http://visionmedia.github.io/mocha) test framework with [Chai](http://chaijs.com) assertions. To run the tests, execute the following command in the top-level application directory:

``` bash
$ make test
```

All new feature development should have corresponding unit tests to validate correct functionality.


### Test Coverage

This repository uses [Istanbul](https://github.com/gotwarlost/istanbul) as its code coverage tool. To generate a test coverage report, execute the following command in the top-level application directory:

``` bash
$ make test-cov
```

Istanbul creates a `./reports/coverage` directory. To access an HTML version of the report,

``` bash
$ open reports/coverage/lcov-report/index.html
```


## License

[MIT license](http://opensource.org/licenses/MIT). 


---
## Copyright

Copyright &copy; 2014. Athan Reines.


[npm-image]: http://img.shields.io/npm/v/compute-kurtosis.svg
[npm-url]: https://npmjs.org/package/compute-kurtosis

[travis-image]: http://img.shields.io/travis/compute-io/kurtosis/master.svg
[travis-url]: https://travis-ci.org/compute-io/kurtosis

[coveralls-image]: https://img.shields.io/coveralls/compute-io/kurtosis/master.svg
[coveralls-url]: https://coveralls.io/r/compute-io/kurtosis?branch=master

[dependencies-image]: http://img.shields.io/david/compute-io/kurtosis.svg
[dependencies-url]: https://david-dm.org/compute-io/kurtosis

[dev-dependencies-image]: http://img.shields.io/david/dev/compute-io/kurtosis.svg
[dev-dependencies-url]: https://david-dm.org/dev/compute-io/kurtosis

[github-issues-image]: http://img.shields.io/github/issues/compute-io/kurtosis.svg
[github-issues-url]: https://github.com/compute-io/kurtosis/issues