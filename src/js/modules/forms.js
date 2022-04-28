import {postData} from '../services/requests';

const forms = (state) => {
	const bindForm = (type, formSelector, inputsSelector, btnSelector) => {
		const form = document.querySelector(formSelector),
		inputs = form.querySelectorAll(inputsSelector),
		btn = form.querySelector(btnSelector);


		function refreshForm () {
			inputs.forEach(input => {
				input.value = '';
			})
			btn.disabled = false;
			btn.classList.remove('button_on-fail');
			btn.classList.remove('button_on-load');
		}

		function showResult (answer) {
			switch (answer) {
				case 'loading':
					btn.disabled = true;
					btn.classList.remove('button_on-fail');
					btn.classList.add('button_on-load');
					break;
				case '+':
					if (type === "email") {
						document.dispatchEvent(new CustomEvent("subscription"));	
					} else if (type === "booking") {
						document.dispatchEvent(new CustomEvent("ok-booking"));
					} else if (type === "cart") {
						document.dispatchEvent(new CustomEvent("ok-cart"));
					}
					break;
				case '-':
					btn.classList.remove('button_on-load');
					btn.classList.add('button_on-fail');
					form.classList.add('fail');
					if (type === "booking" || type === "cart") {
						document.dispatchEvent(new CustomEvent("fail-booking"));	
					}
					setTimeout(() => {
						btn.classList.remove('button_on-fail');
						form.classList.remove('fail');
					},1500)
					break;
			}		
		}

		form.addEventListener('submit', e => {
			e.preventDefault();
			showResult('loading');
			postData('../server.php', form, state)
			.then(res => {
				console.log(res);
				showResult('+');
			})
			.catch(() => {
				showResult('-');
			})
			.finally(refreshForm);
		})
	}
	bindForm('email' ,'.footer__email', 'input', 'button');
	bindForm('booking' ,'.modal-restaurant-booking__form', 'input', '.button_book');
	bindForm('cart' ,'.modal-cart__form', 'input', '.button.button_book.button_cart');
}

export default forms;