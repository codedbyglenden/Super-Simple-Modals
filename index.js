import modal from './modal';

const openModal = document.getElementById( 'open-modal' );
if ( openModal ) {

	// Generates a modal on click.
	openModal.addEventListener( 'click', (e) => {
		e.preventDefault();

		modal.generate({
			title: 'My modal title',
			description: 'My modal description...',
			mainContent: '<textarea id="textarea-id" placeholder="Enter some text..."></textarea>',
			addText: 'Accept & Submit',
			callback: possitiveAction
		});
	});

	// The action taken when you click the positive action button.
	const possitiveAction = () => {
		// Positive action to take.
		console.log( 'Possitive action taken.' );
	};
}