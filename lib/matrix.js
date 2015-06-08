'use strict';

/**
* FUNCTION: kurtosis( out, mat[, dim] )
*	Computes the sample excess kurtosis of a matrix.
*
* @param {Matrix} out - output matrix
* @param {Matrix} mat - input matrix
* @param {Number} [dim=2] - matrix dimension along which to compute the kurtosis. If `dim=1`, compute along matrix rows. If `dim=2`, compute along matrix columns.
* @returns {Matrix|Null} sample excess kurtosis or null
*/
function kurtosis( out, mat, dim ) {
	var delta, delta_n, delta_n2,
		mean, term1,
		M, N, Nobs,
		s0, s1,
		o,
		i, j, k,
		M2, M3, M4, g;

	if ( dim === 1 ) {
		// Compute along the rows...
		M = mat.shape[ 1 ];
		N = mat.shape[ 0 ];
		s0 = mat.strides[ 1 ];
		s1 = mat.strides[ 0 ];
	} else {
		// Compute along the columns...
		M = mat.shape[ 0 ];
		N = mat.shape[ 1 ];
		s0 = mat.strides[ 0 ];
		s1 = mat.strides[ 1 ];
	}
	if ( M === 0 || N === 0 ) {
		return null;
	}
	o = mat.offset;
	for ( i = 0; i < M; i++ ) {

		k = o + i*s0;
		delta = 0;
		delta_n = 0;
		delta_n2 = 0;
		term1 = 0;
		Nobs = 0;
		mean = 0;
		M2 = 0;
		M3 = 0;
		M4 = 0;

		for ( j = 0; j < N; j++ ) {
			Nobs += 1;

			delta = mat.data[ k + j*s1 ] - mean;
			delta_n = delta / Nobs;
			delta_n2 = delta_n * delta_n;

			term1 = delta * delta_n * (Nobs-1);

			M4 += term1*delta_n2*(Nobs*Nobs - 3*Nobs + 3) + 6*delta_n2*M2 - 4*delta_n*M3;
			M3 += term1*delta_n*(Nobs-2) - 3*delta_n*M2;
			M2 += term1;
			mean += delta_n;
		}

		// Calculate the population excess kurtosis:
		g = Nobs*M4 / ( M2*M2 ) - 3;
		// Return the corrected sample excess kurtosis:
		out.data[ i ] = (Nobs-1) / ( (Nobs-2)*(Nobs-3) ) * ( (Nobs+1)*g + 6 );
	}
	return out;
} // end FUNCTION kurtosis()


// EXPORTS //

module.exports = kurtosis;
