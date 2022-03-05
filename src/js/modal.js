/**
 * Super Simple Modal Class.
 */
class SuperSimpleModal {

	/**
	 * Remove the modal & apply focus to the original button.
	 * @param {*} initiatorButton The div clicked to open the modal.
	 */
	remove( initiatorButton = false ) {
		document.getElementById( 'preview-modal' ).remove();

		if ( initiatorButton ) {
			initiatorButton.focus();
		}
	}

	/**
	 * Create a modal & display it on screen.
	 * @param {array} paramList An array of parameters that output a modal. 
	 */
	generate({
		title = '',
		description = '',
		removeText = 'Cancel',
		addText = '',
		mainContent = '',
		callback,
		params = {},
		initiatorButton
	} ) {
		
		// If the user submits main content then wrap it in a div.
		const postContent = mainContent ? `<div id="content" class="modal__content">${mainContent}</div>` : '';
		
		// Base modal markup.
		const modal =  `
		<div role="dialog" aria-modal="true" aria-labelledby="modal-title" id="preview-modal" class="modal">
			<div class="modal__container">
				<h3 id="modal-title">${title}</h3>
				${description ? `<p>${description}</p>` : ''}
				
				${postContent}

				<div class="modal-buttons is-flex">
					<button id="preview-modal__close" aria-label="Close" class="btn btn--preview">${removeText}</button>
					<button id="preview-modal__do_it" class="btn btn--fill">${addText}</button>
				</div>		
			</div>
		</div>`;

		// Append the modal to the DOM.
		document.body.insertAdjacentHTML( 'beforeend', modal );

		// Initiate focus trap.
		this.initiateFocusTrap( 'preview-modal' );

		// Focus the close button on modal open.
		document.getElementById( 'preview-modal__close' ).focus();

		// Add the cancel modal open action.
		document.getElementById( 'preview-modal__close' ).addEventListener( 'click', () => this.remove( initiatorButton ) );

		// Remove the modal if they click the grey area.
		document.getElementById( 'preview-modal' ).addEventListener( 'click', (e) => {
			if ( 'preview-modal' === e.target.getAttribute('id') ) {
				this.remove( initiatorButton );
			}
		});

		/**
		 * When the user clicks escape remove the modal.
		 * TODO: Fix this, keypress is detected but not for the escape key,
		 * think it's blocked by another script.
		 */
		document.body.addEventListener( 'keypress', function(e) {
			const event = e || window.event;
			
			if ( 'key' in event ? ( event.key === 'Escape' || event.key === 'Esc') : ( event.keyCode === 27 ) ) {
				modal.remove();
			}
		});

		// Add the continue with this action callback.
		document.getElementById( 'preview-modal__do_it' ).addEventListener( 'click', () => {
			callback( params );
		});
	}

	/**
	 * Creates a focus trap so the user can't tab the rest of the page while the modal is open.
	 * @param {*} parentId The DOM ID of the div you wish to trap focus within.
	 */
	 initiateFocusTrap( parentId ) {
		
		// Query select the modal.
		const parentContainer = document.querySelector( '#' + parentId );

		// Get all of the child items that can be tabbed to.
		const selectableItems = parentContainer.querySelectorAll( 'a[href]:not([disabled]), button:not([disabled]), textarea:not([disabled]), input[type="text"]:not([disabled]), input[type="radio"]:not([disabled]), input[type="checkbox"]:not([disabled]), select:not([disabled])' );
	
		// The first & last item in the list so we can skip to them at the start/end of the trap.
		const firstFocusableEl = selectableItems[0];
		const lastFocusableEl = selectableItems[ selectableItems.length - 1 ];
		
		// Add a keydown event listener to the modal.
		parentContainer.addEventListener('keydown', function(e) {

			// If the user clicks the tab key.
			if (e.key === 'Tab' || e.keyCode === 9) {

				// If the user clicks shift + tab (go to the previous tab item)
				if ( e.shiftKey ) {

					// If first item, and the user wants to go back select the last item in the trap.
					if (document.activeElement === firstFocusableEl) {
						lastFocusableEl.focus();
						e.preventDefault();
					}
				} else {

					// We're at the last item, select the first item in the trap.
					if (document.activeElement === lastFocusableEl) {
						firstFocusableEl.focus();
						e.preventDefault();
					}
				}
			}
		});
	}
}
