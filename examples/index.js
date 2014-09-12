var kurtosis = require( './../lib' );

var data = new Array( 100 );

for ( var i = 0; i < data.length; i++ ) {
	data[ i ] = Math.random()*100;
}

console.log( kurtosis( data ) );
// A uniform distribution should have an excess kurtosis around -1.2.