/**
 * Open and close accordion content
 */
window.addEventListener( 'DOMContentLoaded', () => {

	const accordions = document.querySelectorAll( '.wp-block-gutenberg-accordion' );

	if ( 0 < accordions.length ) {
		for ( const element of accordions ) {
			const title = element.querySelector( '.wp-block-gutenberg-accordion__title' );
			const content = element.querySelector( '.wp-block-gutenberg-accordion__content' )
			title.addEventListener( 'click', () => {
				content.classList.toggle( 'wp-block-gutenberg-accordion__content--active' );
				title.classList.toggle( 'wp-block-gutenberg-accordion__title--active' );
				if ( 'false' === title.getAttribute( 'aria-expanded' ) ) {
					title.setAttribute( 'aria-expanded', 'true' );
				} else {
					title.setAttribute( 'aria-expanded', 'false' );
				}
			} )
		}
	}
} )
