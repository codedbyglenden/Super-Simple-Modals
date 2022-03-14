import filterXSS from 'xss';

/**
* Super Simple Modal Class.
*/
class SuperSimpleModal {

	/**
	 * Set-up initial global vars.
	 */
	constructor() {
		this.focusableEl = 'a[href]:not([disabled]), button:not([disabled]), textarea:not([disabled]), input[type="text"]:not([disabled]), input[type="radio"]:not([disabled]), input[type="checkbox"]:not([disabled]), select:not([disabled])';
		this.willAnim = false;
		this.animTime = 300;
		this.initiatorButton = null;
		this.allowedAttr = ['aria-label', 'id', 'class', 'title'];
		this.btns = [
			{
				'type': 'button',
				'text': 'Cancel',
				'attr': {
					'aria-label': 'Close modal',
					'id': 'ssm-modal__na',
					'class': 'btn',
					'title': 'Close modal'
				}
			},
			{
				'type': 'button',
				'text': 'Accept',
				'attr': {
					'aria-label': 'Close modal',
					'id': 'ssm-modal__pa',
					'class': 'btn',
					'title': 'Accept & close modal'
				}
			}
		];
	}

	/**
	 * Strip html from string.
	 * @param {string} html String of html to check.
	 * @returns 
	 */
	strip(html) {
		try {
			var doc = document.implementation.createDocument('http://www.w3.org/1999/xhtml', 'html', null);
			doc.documentElement.innerHTML = html;
			return doc.documentElement.textContent || doc.documentElement.innerText;
		} catch(e) {
			return '';
		}		
	}

	/**
	* Remove the modal & apply focus to the original button.
	*/
	async remove() {

		const modal = document.getElementById( 'ssm-modal' );

		if ( modal ) {

			if ( true === this.willAnim ) {

				modal.setAttribute( 'aria-hidden', true );

				await new Promise(resolve => setTimeout(resolve, this.animTime));
			}
			
			modal.remove();
		}

		if ( null !== this.initiatorButton ) {
			this.initiatorButton.focus();
		}
	}

	/**
	* Create a modal & display it on screen.
	* @param {array} paramList An array of parameters that output a modal.
	*/
	generate({
		title = '',
		description = '',
		mainContent = '',
		callback = null,
		params = {},
		initiatorButton = null,
		willAnimate = this.willAnim,
		animationTimeout = this.animTime,
		buttons = this.btns
	} ) {

		if ( initiatorButton ) {
			this.initiatorButton = initiatorButton;
			params.initiatorButton = initiatorButton;
		}

		if ( animationTimeout ) {
			this.animTime = animationTimeout;
		}

		if ( willAnimate ) {
			this.willAnim = willAnimate;
		}

		// If the user submits main content then wrap it in a div.
		const postContent = mainContent ? `<div id="content" class="ssm-modal__content">${filterXSS(mainContent)}</div>` : '';

		const outputDescription = description ? `<div id="ssm-modal__description"><p>${this.strip(description)}</p></div>` : '';

		buttons = this.constructBtns( buttons );

		// Base modal markup.
		const modal =  `
		<div
			id="ssm-modal"
			class="ssm-modal${willAnimate ? ' will-animate':''}"
			role="dialog"
			aria-modal="true"
			aria-labelledby="ssm-modal__title"
    		aria-describedby="ssm-modal__description"
			aria-hidden="false"
		>
			<div class="ssm-modal__container">
				<h3 id="ssm-modal__title">${this.strip(title)}</h3>

				${outputDescription}

				${postContent}

				<div class="ssm-modal-buttons is-flex">
					${buttons}
				</div>
			</div>
		</div>`;

		// Append the modal to the DOM.
		document.body.insertAdjacentHTML( 'beforeend', modal );

		// Initiate focus trap.
		this.initiateFocusTrap( 'ssm-modal' );

		// Add the cancel modal open action.
		document.getElementById( 'ssm-modal__na' ).addEventListener( 'click', () => this.remove() );

		// Remove the modal if they click the grey area.
		document.getElementById( 'ssm-modal' ).addEventListener( 'click', (e) => {
			if ( 'ssm-modal' === e.target.getAttribute('id') ) {
				this.remove();
			}
		});

		/**
		 * Hit the escape key to exit the modal.
		 */
		document.body.addEventListener( 'keydown', (e) => {
			const event = e || window.event;

			if ( 'key' in event ? ( event.key === 'Escape' || event.key === 'Esc') : ( event.keyCode === 27 ) ) {
				this.remove();
			}
		});

		// Add the continue with this action callback.
		if ( callback ) {
			document.getElementById( 'ssm-modal__pa' ).addEventListener( 'click', () => {
				callback( params );
			});
		}
	}

	/**
	 * Construct buttons
	 * @param {array} buttonArray An array of parameters to create buttons.
	 * 
	 * @returns {string} btnMarkup A string of buttons.
	 */
	constructBtns( buttons = [] ) {

		let btnMarkup = '';

		buttons.forEach(btn => {
			const btnType = 'button' === btn.type ? 'button' : 'a';
			let attributes = '';

			// Loops the attributes, and add white listed.
			Object.entries(btn.attr).map(([key, attribute]) => {
				if ( this.allowedAttr.includes(key) ) {
					attributes += ` ${key}="${ this.strip( attribute )}"`;
				}
			});

			// Construct button.
			const button = `<${btnType} ${attributes}>${btn.text}</${btnType}>`;

			// Adds button to btn markup.
			btnMarkup += button;
		});

		// Return the string of constructed markup.
		return btnMarkup;
	}

	/**
	* Creates a focus trap so the user can't tab the rest of the page while the modal is open.
	* @param {*} parentId The DOM ID of the div you wish to trap focus within.
	*/
	initiateFocusTrap( parentId ) {

		// Query select the modal.
		const parentContainer = document.querySelector( '#' + parentId );

		// Get all of the child items that can be tabbed to.
		const selectableItems = parentContainer.querySelectorAll(
			this.focusableEl
		);

		// The first & last item in the list so we can skip to them at the start/end of the trap.
		const firstFocusableEl = selectableItems[0];
		const lastFocusableEl = selectableItems[ selectableItems.length - 1 ];

		// Focus the first focusable item.
		firstFocusableEl.focus();

		// Add a keydown event listener to the modal.
		parentContainer.addEventListener('keydown', (e) => {

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

export default SuperSimpleModal;
