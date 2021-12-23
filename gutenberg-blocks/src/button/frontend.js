const { __ } = wp.i18n;

/**
 * Toggle popup on button click
 */

const popupRelationship = document.querySelectorAll( '[data-rel="popup"]' );

if ( 0 < popupRelationship.length ) {
	for ( const element of popupRelationship ) {
		const source = element.querySelectorAll( 'a' )[ 0 ].getAttribute( 'href' );
		const popup = `
			<div class="modal">
				<div class="modal__dialog" role="dialog" aria-modal="true" tabindex="-1">
					<div class="modal__content">
						<div class="modal__body">
							<div class="modal__iframe">
								<iframe src="${ source }" allowfullscreen="" aria-hidden="true"></iframe>
							</div>
						</div>
						<div class="modal__footer">
							<button>${ __( 'Close', 'gutenberg' ) }</button>
						</div>
					</div>
				</div>
			</div>`;
		element.insertAdjacentHTML( 'afterend', popup );

		element.addEventListener( 'click', ( event ) => {
			event.preventDefault();
			element.nextElementSibling.classList.add( 'modal--open' );
			element.nextElementSibling.querySelector( 'iframe' ).removeAttribute( 'aria-hidden' );
			setTimeout( () => {
				element.nextElementSibling.querySelector( '.modal__dialog' ).focus();
			}, 160 );
		} );

		document.addEventListener( 'click', ( event ) => {
			if ( document.querySelector( '.modal--open' ) && ( event.target.matches( '.modal__footer button' ) || event.target.matches( '.modal' ) ) ) {
				close();
			}
		} );

		document.addEventListener( 'keydown', ( event ) => {
			if ( document.querySelector( '.modal--open' ) && 'Escape' === event.key ) {
				close();
			}
		} );

		const close = () => {
			element.nextElementSibling.classList.remove( 'modal--open' );
			element.setAttribute( 'tabindex', '-1' );
			element.focus();
			element.nextElementSibling.querySelector( 'iframe' ).setAttribute( 'aria-hidden', 'true' );
		}

	}
}

/**
 * Scroll to section on button click
 */

const sectionRelationship = document.querySelectorAll( '[data-rel="section"]' );

if ( 0 < sectionRelationship.length ) {
	for ( const element of sectionRelationship ) {
		element.addEventListener( 'click', ( event ) => {
			event.preventDefault();
			const section = document.getElementById( element.querySelectorAll( 'a' )[ 0 ].getAttribute( 'href' ).slice( 1 ) ); // eslint-disable-line unicorn/prefer-query-selector
			section.scrollIntoView();
		} )
	}
}
