const modals = () => {
	const allModals = document.querySelectorAll('[data-modal]');

	allModals.forEach(modal => {
		modal.classList.add('animate__animated');
	});

	function bindModal(modalSelector, contentSelector, buttonsSelector, activeClass, closeSelector, instantly = false, bookingItem = false) {
		const modal = document.querySelector(modalSelector),
			  modalContent = document.querySelector(contentSelector),
			  close = modal.querySelector(closeSelector);
		
		modalContent.classList.add('animate__animated');

		// Modal content depends on trigger
		if (bookingItem) {
			modal.querySelector('.modal-sub__text').textContent = `${bookingItem.name} added to your cart`;
		}

		if (instantly) {
			showModal(modal, modalContent, activeClass);
		} else {
			document.querySelectorAll(buttonsSelector).forEach(button => {
				button.addEventListener('click', () => {
				showModal(modal, modalContent, activeClass);
				})
			})
		}


		close.addEventListener('click', () => {
			hideModal(modal, modalContent, activeClass);
		})

		modal.addEventListener('click', e => {
			if (e.target === modal) {
				hideModal(modal, modalContent, activeClass);
			}
		})

	}

	function showModal(modal, modalContent, activeClass) {

		allModals.forEach(item => {
			if (item !== modal)
			hideModal(item, modalContent, activeClass);
		})

		modal.classList.remove('animate__fadeOut');
		modal.classList.add(activeClass, 'animate__fadeIn');

		modalContent.classList.remove('animate__fadeOutUp');
		modalContent.classList.add('animate__fadeInDown');

		document.body.style.marginRight = calcScrollWidth() + 'px';
        document.body.style.overflow = "hidden";
	}

	function hideModal (modal, modalContent, activeClass) {
		setTimeout(()=> {
			modal.classList.remove(activeClass, 'animate__fadeIn');
		}, 600)
		modalContent.classList.add('animate__fadeOutUp');
		modalContent.classList.remove('animate__fadeInDown');
		modal.classList.add('animate__fadeOut');

		document.dispatchEvent(new CustomEvent("modal-closed", {
			detail: modal,
			bubbles: false
		}));

		document.body.style.overflow = "";
   		document.body.style.marginRight = 0;
	}	

	const calcScrollWidth = () => {
		return window.innerWidth - document.body.clientWidth;
	}

	bindModal('.modal-cart', '.modal-cart__content', '[data-open-cart]', 'modal_opened', '.modal-cart__close');
	document.addEventListener('subscription', () => {
		bindModal('.modal-sub', '.modal-sub__content', '', 'modal_opened', '.modal-sub__close', true);
	});
	document.addEventListener('rest-booking', () => {
		bindModal('.modal-restaurant-booking', '.modal-restaurant-booking__content', '', 'modal_opened', '.button.button_back.button_rest', true);
	});
	document.addEventListener('ok-booking', () => {
		bindModal('.modal-sub.modal_book', '.modal-sub__content', '', 'modal_opened', '.modal-sub__close', true);
	});
	document.addEventListener('ok-cart', () => {
		bindModal('.modal-order', '.modal-order__content', '', 'modal_opened', '.modal-order__close', true);
	});
	document.addEventListener('fail-booking', () => {
		bindModal('.modal-fail.modal_book', '.modal_book > .modal-fail__content', '', 'modal_opened', '.modal_book .modal-fail__close', true);
	});
	document.addEventListener('search-fail', () => {
		bindModal('.modal-fail', '.modal-fail__content', '', 'modal_opened', '.modal-fail__close', true);
	});
	document.addEventListener('added-to-cart', e => {
		bindModal('.modal-sub.modal_cart-book', '.modal_cart-book > .modal-sub__content', '', 'modal_opened', '.modal-sub .modal-sub__close', true, e.detail);
	});
	bindModal('.modal-restaurants', '.modal-restaurants__content', '.booking__search .button, .button_back', 'modal_opened', '.modal-restaurants__close');
}

export default modals;