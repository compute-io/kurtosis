Excess Kurtosis
===
[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Coverage Status][coveralls-image]][coveralls-url] [![Dependencies][dependencies-image]][dependencies-url]

> Computes the sample excess kurtosis.

The [sample excess kurtosis](http://en.wikipedia.org/wiki/Kurtosis) is defined by

<div class="equation" align="center" data-raw-text="g_2 = \frac{\tfrac{1}{N} \sum_{i=0}^{N-1} (x_i - \overline{x})^4}{\left(\tfrac{1}{N} \sum_{i=0}^{N-1} (x_i - \overline{x})^2\right)^2} - 3
" data-equation="eq:sample_excess_kurtosis">
	<img src="https://cdn.rawgit.com/compute-io/kurtosis/cd337b33bf382364905cd924d6b88a848491fcc4/docs/img/eqn1.svg" alt="Equation for the sample excess kurtosis.">
	<br>
</div>

where `x_0, x_1,...,x_{N-1}` are individual data values and `N` is the total number of values in the data set.

## Installation

``` bash
$ npm install compute-kurtosis
```

For use in the browser, use [browserify](https://github.com/substack/node-browserify).


## Usage


``` javascript
var kurtosis = require( 'compute-kurtosis' );
```


#### kurtosis( x[, opts] )

Computes the [sample excess kurtosis](http://en.wikipedia.org/wiki/Kurtosis). `x` may be either an [`array`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array), [`typed array`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Typed_arrays), or [`matrix`](https://github.com/dstructs/matrix).

``` javascript
var data, kurt;

data = [ 2, 4, 5, 3, 8, 2 ];
kurt = kurtosis( data );
// returns approx 1.257

data = new Int8Array( data );
kurt = kurtosis( data );
// returns approx 1.257
```

For non-numeric `arrays`, provide an accessor `function` for accessing `array` values.

``` javascript
var data = [
	{'x':2},
	{'x':4},
	{'x':5},
	{'x':3},
	{'x':8},
	{'x':2}
];

function getValue( d, i ) {
	return d.x;
}

var kurt = kurtosis( data, {
	'accessor': getValue
});
// returns approx 1.257
```

If provided a [`matrix`](https://github.com/dstructs/matrix), the function accepts the following `options`:

*	__dim__: dimension along which to compute the [kurtosis](http://en.wikipedia.org/wiki/Kurtosis). Default: `2` (along the columns).
*	__dtype__: output [`matrix`](https://github.com/dstructs/matrix) data type. Default: `float64`.

By default, the function computes the [kurtosis](http://en.wikipedia.org/wiki/Kurtosis) along the columns (`dim=2`).

``` javascript
var matrix = require( 'dstructs-matrix' ),
	data,
	mat,
	kurt,
	i;

data = 	data = new Int8Array( [ 3, 0, 6, 7, 2, 5, 4, 3, 8, 4, 2, 1, 5, 3, 8, 9] );
mat = matrix( data, [4,4], 'int8' );
/*
	[  3 0 6 7
	   2 5 4 3
	   8 4 2 1
	   5 3 8 9 ]
*/

kurt = kurtosis( mat );
/*
	[  -1.7
	   -1.2
	   0.758
	   -3.033 ]
*/
```

To compute the [kurtosis](http://en.wikipedia.org/wiki/Kurtosis) along the rows, set the `dim` option to `1`.

``` javascript
kurt = kurtosis( mat, {
	'dim': 1
});
/*
	[ -0.286, 1.5, -1.2, -3.3 ]
*/
```

By default, the output [`matrix`](https://github.com/dstructs/matrix) data type is `float64`. To specify a different output data type, set the `dtype` option.

``` javascript
kurt = kurtosis( mat, {
	'dim': 1,
	'dtype': 'int8'
});
/*
	[ 0, 1, -1, -3 ]
*/

var dtype = kurt.dtype;
// returns 'int8'
```

If provided a [`matrix`](https://github.com/dstructs/matrix) having either dimension equal to `1`, the function treats the [`matrix`](https://github.com/dstructs/matrix) as a [`typed array`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Typed_arrays) and returns a `numeric` value.

``` javascript
data = [ 2, 4, 5, 3, 8, 2 ];

// Row vector:
mat = matrix( new Int8Array( data ), [1,6], 'int8' );
kurt = kurtosis( mat );
// returns approx 1.312

// Column vector:
mat = matrix( new Int8Array( data ), [6,1], 'int8' );
kurt = kurtosis( mat );
// returns  approx 1.312
```

If provided an empty [`array`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array), [`typed array`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Typed_arrays), or [`matrix`](https://github.com/dstructs/matrix), the function returns `null`.

``` javascript
kurt = kurtosis( [] );
// returns null

kurt = kurtosis( new Int8Array( [] ) );
// returns null

kurt = kurtosis( matrix( [0,0] ) );
// returns null

kurt = kurtosis( matrix( [0,10] ) );
// returns null

kurt = kurtosis( matrix( [10,0] ) );
// returns null
```

## Examples

``` javascript
var matrix = require( 'dstructs-matrix' ),
	kurtosis = require( 'compute-kurtosis' );

var data,
	mat,
	kurt,
	i;


// ----
// Plain arrays...
data = new Array( 1000 );
for ( i = 0; i < data.length; i++ ) {
	data[ i ] = Math.random() * 100;
}
kurt = kurtosis( data );
console.log( 'Arrays: %d\n', kurt );
// A uniform distribution should have an excess kurtosis around -1.2.

// ----
// Object arrays (accessors)...
function getValue( d ) {
	return d.x;
}
for ( i = 0; i < data.length; i++ ) {
	data[ i ] = {
		'x': data[ i ]
	};
}
kurt = kurtosis( data, {
	'accessor': getValue
});
console.log( 'Accessors: %d\n', kurt );


// ----
// Typed arrays...
data = new Int32Array( 1000 );
for ( i = 0; i < data.length; i++ ) {
	data[ i ] = Math.random() * 100;
}
kurt = kurtosis( data );
console.log( 'Typed arrays: %d\n', kurt );


// ----
// Matrices (along rows)...
mat = matrix( data, [100,10], 'int32' );
kurt = kurtosis( mat, {
	'dim': 1
});
console.log( 'Matrix (rows): %s\n', kurt.toString() );


// ----
// Matrices (along columns)...
kurt = kurtosis( mat, {
	'dim': 2
});
console.log( 'Matrix (columns): %s\n', kurt.toString() );


// ----
// Matrices (custom output data type)...
kurt = kurtosis( mat, {
	'dtype': 'uint8'
});
console.log( 'Matrix (%s): %s\n', kurt.dtype, kurt.toString() );

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

Unit tests use the [Mocha](http://mochajs.org) test framework with [Chai](http://chaijs.com) assertions. To run the tests, execute the following command in the top-level application directory:

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


---
## License

[MIT license](http://opensource.org/licenses/MIT).


## Copyright

Copyright &copy; 2014-2015. The [Compute.io](https://github.com/compute-io) Authors.


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
