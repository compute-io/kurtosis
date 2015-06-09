'use strict';

/**
* FUNCTION: kurtosis( arr, clbk )
*	Computes the sample excess kurtosis of an array of values using an accessor.
*
* @param {Array} arr - array of values
* @param {Function} clbk - accessor function for accessing array values
* @returns {Number|Null} sample excess kurtosis or null
*/
function kurtosis( arr, clbk ) {

	var len = arr.length,
		delta = 0,
		delta_n = 0,
		delta_n2 = 0,
		term1 = 0,
		N = 0,
		mean = 0,
		M2 = 0,
		M3 = 0,
		M4 = 0,
		g,
		i;

	if ( !len ) {
		return null;
	}

	for ( i = 0; i < len; i++ ) {
		N += 1;

		delta = clbk( arr[ i ], i ) - mean;
		delta_n = delta / N;
		delta_n2 = delta_n * delta_n;

		term1 = delta * delta_n * (N-1);

		M4 += term1*delta_n2*(N*N - 3*N + 3) + 6*delta_n2*M2 - 4*delta_n*M3;
		M3 += term1*delta_n*(N-2) - 3*delta_n*M2;
		M2 += term1;
		mean += delta_n;
	}
	// Calculate the population excess kurtosis:
	g = N*M4 / ( M2*M2 ) - 3;
	// Return the corrected sample excess kurtosis:
	return (N-1) / ( (N-2)*(N-3) ) * ( (N+1)*g + 6 );

} // end FUNCTION kurtosis()


// EXPORTS //

module.exports = kurtosis;
