const changeModalState = (state) => {
	const setBookingState = () => {
		clearState();
		const location = document.querySelector('.modal-restaurant-booking__location-val').innerHTML,
			  date = document.querySelector('.modal-restaurant-booking__date-val').innerHTML,
			  time = document.querySelector('.modal-restaurant-booking__time-val').innerHTML,
			  guests = document.querySelector('.modal-restaurant-booking__guests-val').innerHTML;
			  
		state.location = location;
		state.date = date;
		state.time = time;
		state.guests = guests;
	}

	const setCartState = (obj) => {
		const items = JSON.parse(JSON.stringify(obj));
		clearState();
		const total = document.querySelector('.modal-cart__total-price span').textContent;
		for (const key in items) {
			if (Object.hasOwnProperty.call(items, key)) {
				delete items[key].src;
				state[key] = JSON.stringify(items[key]);
			}
		}
		state.total = total;
	}

	function clearState() {
		for (const key in state) {
			delete state[key];
		}
	}

	document.addEventListener("rest-booking", setBookingState);
	document.addEventListener('cart-changed', e => {
		setCartState(e.detail);
	}) 
}

export default changeModalState;