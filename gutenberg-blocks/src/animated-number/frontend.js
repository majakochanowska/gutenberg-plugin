/**
 * Animate number
 *
 * @param {HTMLElement} number Number to animate.
 * @param {number}      start  Value to start from.
 * @param {string}      end    Value of end.
 */

const animate = ( number, start, end ) => {

	let addRemovedComma;

	if ( end.includes( ',' ) ) {
		end = end.replace( ',', '' );
		addRemovedComma = 'true';
	}

	let startTimestamp;
	const step = ( timestamp ) => {

		if ( ! startTimestamp ) {
			startTimestamp = timestamp;
		}

		const progress = Math.min( ( timestamp - startTimestamp ) / 4000, 1 );
		number.innerHTML = Math.floor( progress * ( end - start ) + start );

		if ( 1 > progress ) {
			window.requestAnimationFrame( step );
		} else if ( 1 <= progress && 'true' === addRemovedComma ) {
			end = end.slice( 0, -3 ) + ',' + end.slice( -3 );
			number.textContent = end;
		}
	};
	window.requestAnimationFrame( step );
}

/**
 * Animate number when it's visible on the page
 */
const observer = new IntersectionObserver( ( entries ) => {

	for ( const entry of entries ) {

		const number = entry.target;
		const end = entry.target.textContent;

		if ( true === entry.isIntersecting ) {
			animate( number, 0, end );
			observer.unobserve( number );
		}
	}
} );

/**
 * Get numbers and animate them
 */

export const animateNumberElements = () => {

	const numbers = document.querySelectorAll( '.gutenberg-format-animated-number' );

	for ( const number of numbers ) {

		setTimeout( function() {
			number.style.visibility = 'visible';
		}, 100 );

		observer.observe( number );
	}
}

/**
 * Animate numbers
 */
window.addEventListener( 'DOMContentLoaded', animateNumberElements );
