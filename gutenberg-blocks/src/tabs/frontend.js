window.addEventListener( 'DOMContentLoaded', () => manageTabs() );

/**
 * Display initial tab panel, call function on selected tab header
 */
const manageTabs = () => {

	const tabs = document.querySelectorAll( '.wp-block-gutenberg-tabs' );

	for ( const tab of tabs ) {

		const tabHeaders = tab.querySelectorAll( '.wp-block-gutenberg-tabs__header' );
		const content = tab.querySelector( '.wp-block-gutenberg-tabs__content' );
		const tabPanels = content.querySelectorAll( '.wp-block-gutenberg-tab' );

		for ( const tabHeader of tabHeaders ) {
			tabHeader.addEventListener( 'click', () => selectTab( tabHeader ) );
		}

		for ( const tabPanel of tabPanels ) {

			const panelIndex = [ ...tabPanel.parentElement.children ].indexOf( tabPanel );
			tabPanel.setAttribute( 'id', `tab${ panelIndex + 1 }` );

			if ( 0 === panelIndex ) {
				tabPanel.classList.add( 'wp-block-gutenberg-tab--active' );
			}
		}
	}
}

/**
 * Display selected tab.
 *
 * @param {Object} selectedTab Selected tab header.
 */
const selectTab = ( selectedTab ) => {

	const headers = [ ...selectedTab.parentElement.children ];
	const headerIndex = headers.indexOf( selectedTab );
	const contentElements = [ ...selectedTab.parentElement.parentElement.querySelectorAll( '.wp-block-gutenberg-tab' ) ];

	for ( const header of headers ) {

		header.classList.remove( 'wp-block-gutenberg-tabs__header--active' );
		header.setAttribute( 'aria-selected', 'false' );
	}

	selectedTab.classList.add( 'wp-block-gutenberg-tabs__header--active' );
	selectedTab.setAttribute( 'aria-selected', 'true' );

	for ( const [ index, element ] of contentElements.entries() ) {
		index === headerIndex ? element.classList.add( 'wp-block-gutenberg-tab--active' ) : element.classList.remove( 'wp-block-gutenberg-tab--active' );
	}
}
