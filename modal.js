const modal =  {

	/**
	* Removes the modal from the DOM.
	*/
	remove: () => {
		document.getElementById( 'modal' ).remove();
	},

	/**
	* Generates the modal & adds close actions.
	* @param {arrayOfModalItems}
	*/
	generate: ( { title = '', description = '', removeText = 'Cancel', addText = '', mainContent = '', callback } ) => {

		// If the content is set then wrap it in a content div.
		const postContent = mainContent ? `<div id="content" class="modal__content">${mainContent}</div>` : '';

		// The main modal content.
		const modal =  `
		<div id="modal" class="modal">
			<div class="modal__container">
				<h3>${title}</h3>
				${description}

				${postContent}

				<div class="modal-buttons is-flex">
					<button id="preview-modal__close" class="btn btn--primary">${removeText}</button>
					<button id="preview-modal__do_it" class="btn btn--primary">${addText}</button>
				</div>
			</div>
		</div>`;

		// Append the modal to the DOM.
		document.body.insertAdjacentHTML( 'beforeend', modal );

		// Add the cancel modal open action.
		document.getElementById( 'preview-modal__close' ).addEventListener( 'click', modal.remove );

		// Remove the modal when the user clicks in the grey area.
		document.getElementById( 'modal' ).addEventListener( 'click', (e) => {
			if ( 'modal' === e.target.getAttribute('id') ) {
				modal.remove();
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
		document.getElementById( 'modal__do_it' ).addEventListener( 'click', callback );
	}
};

export default modal;