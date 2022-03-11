import SuperSimpleModal from '../node_modules/super-simple-modals/dist/ssm.esm.js';

(function () {

	'use strict';

	// Check if ssm is defined.
	if ( 'undefined' !== typeof SuperSimpleModal ) {

		// Check if the open modal button exists.
		const openModal = document.getElementById( 'open-modal' );
		if ( openModal ) {

			// Initiate the ssm class.
			const modal = new SuperSimpleModal();

			// Click handler 
			openModal.addEventListener( 'click', (e) => {
				e.preventDefault();

				// Generates a modal.
				modal.generate({
					title: 'My modal title',
					description: 'My modal description...',
					addText: 'Submit',
					initiatorButton: e.target,
					callback: possitiveAction,
					willAnimate: true,
				});
			});

			// The action taken when you click the positive action button.
			const possitiveAction = ({initiatorButton}) => {
				
				// Callback is hit when the user selects the right hand button.
				console.log( 'Possitive action taken.' );

				// Remove the modal & return the focus to the original button.
				modal.remove( initiatorButton );
			};
		}
	}
})();