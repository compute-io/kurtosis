/* global describe, it, require, beforeEach */
'use strict';

// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Matrix data structure:
	matrix = require( 'dstructs-matrix' ),

	// Module to be tested:
	kurtosis = require( './../lib/matrix.js' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'matrix kurtosis', function tests() {

	var data,
		mat;

	data = new Int8Array( [ 3, 0, 6, 7, 2, 5, 4, 3, 8, 4, 2, 1, 5, 3, 8, 9] );

	beforeEach( function before() {
		mat = matrix( data, [4,4], 'int8' );
	});

	it( 'should export a function', function test() {
		expect( kurtosis ).to.be.a( 'function' );
	});

	it( 'should compute the kurtosis along matrix columns', function test() {
		var out, kurt, expected;

		out = matrix( [4,1], 'float32' );

		kurt = kurtosis( out, mat );
		expected = '-1.7000000476837158;-1.2000000476837158;0.7576559782028198;-3.0329670906066895';

		assert.strictEqual( kurt.toString(), expected );

		kurt = kurtosis( out, mat, 2 );
		expected = '-1.7000000476837158;-1.2000000476837158;0.7576559782028198;-3.0329670906066895';

		assert.strictEqual( kurt.toString(), expected );

		// Flip a matrix up-down:
		mat.strides[ 0 ] *= -1;
		mat.offset = mat.length + mat.strides[ 0 ];

		kurt = kurtosis( out, mat );
		expected = '-3.0329670906066895;0.7576559782028198;-1.2000000476837158;-1.7000000476837158';

		assert.strictEqual( kurt.toString(), expected );
	});

	it( 'should compute the kurtosis along matrix rows', function test() {
		var out, mu, expected;

		out = matrix( [1,4], 'float32' );

		mu = kurtosis( out, mat, 1 );
		expected = '-0.2857142984867096,1.5,-1.2000000476837158,-3.299999952316284';

		assert.strictEqual( mu.toString(), expected );

		// Flip a matrix left-right:
		mat.strides[ 1 ] *= -1;
		mat.offset = mat.strides[ 0 ] - 1;

		mu = kurtosis( out, mat );
		expected = '-1.7000000476837158,-1.2000000476837158,0.7576559782028198,-3.0329670906066895';

		assert.strictEqual( mu.toString(), expected );
	});

	it( 'should return null if provided a matrix having one or more zero dimensions', function test() {
		var out, mat;

		out = matrix( [0,0] );

		mat = matrix( [0,10] );
		assert.isNull( kurtosis( out, mat ) );

		mat = matrix( [10,0] );
		assert.isNull( kurtosis( out, mat ) );

		mat = matrix( [0,0] );
		assert.isNull( kurtosis( out, mat ) );
	});
});
