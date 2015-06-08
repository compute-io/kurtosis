'use strict';

var matrix = require( 'dstructs-matrix' ),
	kurtosis = require( './../lib' );

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
