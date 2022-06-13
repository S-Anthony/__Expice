const cart = (foodItems) => {
	const cart = document.querySelector('.modal-cart'),
		  cartItemsContainer = cart.querySelector('.modal-cart__items-wrapper ul'),
		  clearCartBtns = document.querySelectorAll('.header__user-clear-cart'),
		  cartForm = document.querySelector('.modal-cart__form'),
		  cartTriggers = document.querySelectorAll('[data-open-cart]'),
		  emptyCart = document.createElement('li'),
		  foodItemsContainer = document.querySelector('.food__items');
	emptyCart.textContent = 'your cart is empty, for now :)';
	emptyCart.classList.add('modal-cart__items-item-empty');
	let cartItems = {};
	removeItems();

	
	function toggleForm(disable) {
		if (disable) {
			cartForm.classList.add('disabled');
		} else {
			cartForm.classList.remove('disabled');
		}
	}

	function getSibling(selector, parentSelector) {
		return this.closest(parentSelector) ? this.closest(parentSelector).querySelector(selector) : false;
	}

	function calcPrice() {
		let price = 0;
		for (let key in cartItems) {
			price += cartItems[key].price * cartItems[key].quantity; 
		}
		document.querySelector('.modal-cart__total-price span').textContent = `$${price}`;
	}

	function changeQuantity (way, button) {
		const valueContainer = getSibling.call(button, '.modal-cart__items-quantity-value', '.modal-cart__items-item'),
			  priceContainer = getSibling.call(button, '.modal-cart__items-price', '.modal-cart__items-item'),
			  currentId = button.closest('.modal-cart__items-item').getAttribute('id').replace(/-added-in-cart$/, '');

		let current = +valueContainer.textContent;

		if (way === '+') {
			cartItems[currentId].quantity = ++current;
			getSibling.call(button, '.modal-cart__items-quantity-dec', '.modal-cart__items-item').classList.remove('disabled');
			if (cartItems[currentId].quantity >= 99) {
				button.classList.add('disabled');
			}
		} else {
			getSibling.call(button, '.modal-cart__items-quantity-inc', '.modal-cart__items-item').classList.remove('disabled');
			cartItems[currentId].quantity = --current;

			if (cartItems[currentId].quantity < 2) {
				button.classList.add('disabled');
			}
		}

		valueContainer.textContent = cartItems[currentId].quantity;
		priceContainer.textContent = `${cartItems[currentId].quantity * cartItems[currentId].price}$`;
		calcPrice();
		document.dispatchEvent(new CustomEvent("cart-changed", {
			detail: cartItems
		}));
	}

	function booking (btn) {
		const itemParams = {};

		const id = btn.closest('.food__item').getAttribute('id');
		itemParams.name = getSibling.call(btn, '.food__info-title', '.food__item').textContent;
		itemParams.src = getSibling.call(btn, '.food__img img', '.food__item').getAttribute('src');
		itemParams.quantity = 1;

		foodItems.forEach(item => {
			if (`food-item-${item.id}` === id) {
				itemParams.price = item.price;
			}
		})
		
		if (id === 'food-item-r1' || id === 'food-item-r2') {
			itemParams.price = 10;
		}
		cartItems[id] = itemParams;

		document.dispatchEvent(new CustomEvent("added-to-cart", {
			detail: cartItems[id]
		}));

		renderCartItems(cartItems);
		toggleForm();
	}

	function removeItems(item) {
		if (!item) {
			cartItemsContainer.innerHTML = '';
			cartItems = {};
		} else {
			delete cartItems[item.getAttribute('id').replace(/-added-in-cart$/, '')];
			item.remove();
		}	
		if (!cartItemsContainer.hasChildNodes()) {
			cartItemsContainer.appendChild(emptyCart);
			toggleForm(true);
		}
		calcPrice();
		document.dispatchEvent(new CustomEvent("cart-changed", {
			detail: cartItems
		}));
	}

	function bindButtons () {
		const items = cartItemsContainer.querySelectorAll('.modal-cart__items-item');
		items.forEach(item => {
			item.addEventListener('click', function(e){
				if (e.target.closest('.modal-cart__items-quantity-dec')) {
					changeQuantity('-', e.target);
				} else if(e.target.closest('.modal-cart__items-quantity-inc')) {
					changeQuantity('+', e.target);
				} else if(e.target.closest('.modal-cart__items-delete')) {
					removeItems(item);
				}
			})
		})
	}

	function renderCartItems (items) {
		cartItemsContainer.innerHTML = '';
		for (const key in items) {
			const cartItem = document.createElement('li');
			cartItem.classList.add('modal-cart__items-item');
			let {name, src, price} = items[key];
			if (name.length > 11) {
				name = name.match(/^.{8}/) + '...';
			}
			cartItem.setAttribute('id', `${key}-added-in-cart`);
			cartItem.innerHTML = `
			<div class="modal-cart__items-name">
				<div class="modal-cart__items-name-img">
					<picture>
						<source type="image/webp" srcset="${src.replace(/[^.]+$/, 'webp')}">
						<source type="image/jpeg" srcset="${src}">
						<img src="${src}" alt="preview">
					</picture>
				</div>
				<div class="modal-cart__items-name-text">
					${name}
				</div>
			</div>
			<div class="modal-cart__items-quantity">
				<div class="modal-cart__items-quantity-dec disabled">
					-
				</div>
				<div class="modal-cart__items-quantity-value">
					1
				</div>
				<div class="modal-cart__items-quantity-inc">
					+
				</div>
			</div>
			<div class="modal-cart__items-price">
				${price}$
			</div>
			<div class="modal-cart__items-delete">
				&#128465
			</div>
		`;

		cartItemsContainer.appendChild(cartItem);
		}

		calcPrice();
		bindButtons();
	}

	clearCartBtns.forEach(btn => {
		btn.addEventListener('click', ()=> {
			removeItems();
		});
	});

	foodItemsContainer.addEventListener('click', e => {
		if (e.target.classList.contains('food__info-btn') || e.target.closest('.food__info-btn')) {
			booking(e.target);
		}
	});

	document.addEventListener('ok-cart', () => {
		removeItems();
	});

	cartTriggers.forEach(item => {
		item.addEventListener('click', () => {
			document.dispatchEvent(new CustomEvent("cart-changed", {
				detail: cartItems
			}));
		})
	});
}

export default cart;