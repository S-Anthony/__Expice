const restaurantBooking = (receivedRestaurants) => {
	const triggerBtn = document.querySelector('.booking__search .button');

	// get first element from range (like this: 9-15), and, if its time values transform into "9AM-3PM" form
	function getFirst(range, type) {
		let start;
		if (type === "time") {
			start = +range.match(/^\d+/) > 12 ? +range.match(/^\d+/) - 12 + '.00 PM' : range.match(/^\d+/) + '.00 AM';
		} else if (type === "guests") {
			start = +range.match(/^\d+/);
		}
		
		return start;
	}


	// Main function. Get values from json init form render
	function createBookingItems() {
		const restaurantPerfectContainer = document.querySelector('.modal-restaurants__perfect'),
			  restaurantsByLocationContainer = document.querySelector('.modal-restaurants__loc .modal-restaurants__wrapper ul'),
			  restaurantsByParamsContainer = document.querySelector('.modal-restaurants__params .modal-restaurants__wrapper ul'),
			  dateOption = document.querySelector('.booking__params-date .booking__params-param').innerHTML,
			  timeOption = document.querySelector('.booking__params-time .booking__params-param').innerHTML,
			  guestsOption = document.querySelector('.booking__params-guests .booking__params-param').innerHTML;
		let restaurantPerfect = [],
		restaurantsByLocation = [],
		restaurantsByParams = [],
		location = document.querySelector('.booking__search input').value;
		location = location.length > 0 ? location.match(/\w+/g).join(' ') : '';
		receivedRestaurants.forEach(obj => {
			const guestMatch = +guestsOption.match(/^\d+/) >= +obj.guests.match(/^\d+/) &&
			+guestsOption.match(/^\d+/) <= +obj.guests.match(/\d+$/);
			if (location.toLowerCase() === obj.location.toLowerCase()) {
				for (let key in obj.dates) {
					if(key === dateOption && guestMatch) {
						restaurantPerfect.push({
							location: obj.location,
							date: key,
							time: timeOption,
							guests: guestsOption
						})
					}
					restaurantsByLocation.push({
						location: obj.location,
						date: key,
						time: obj.dates[key],
						guests: obj.guests,
					})
				}
			} 
			if (guestMatch){
				for (let key in obj.dates) {
					if(key === dateOption) {
						restaurantsByParams.push({
							location: obj.location,
							date: key,
							time: timeOption,
							guests: guestsOption
						})
					}
				}
			}
		});

		renderItems(restaurantPerfect, restaurantPerfectContainer, "perfect");
		renderItems(restaurantsByLocation, restaurantsByLocationContainer, "location");
		renderItems(restaurantsByParams, restaurantsByParamsContainer,"params");
	}


	// function that render items in form 
	function renderItems(itemsArr, parent, type) { 
		parent.innerHTML= '';

		if (itemsArr.length <= 0) {
			const item = type === 'perfect' ? document.createElement('div') : document.createElement('li');
			item.classList.add('modal-restaurants__fail');
			item.innerHTML = `Sorry, we didn't find such restaurant`;
			parent.appendChild(item);
		} else {
			itemsArr.forEach((element, i) => {
				const item = type === 'perfect' ? document.createElement('div') : document.createElement('li');
				item.classList.add('modal-restaurants__item', `by-${type}`);
				const number = type === "perfect" ? '' : `
				<div class="modal-restaurants__number">
					<div>№</div><div>${++i}</div>
				</div>
				`;
				const timeBtns = type === "location" ? '<div class="modal-restaurants__time-inc">+</div><div class="modal-restaurants__time-dec disabled">-</div>' : '';
				const guestsBtns = type === "location" ? '<div class="modal-restaurants__guests-inc">+</div><div class="modal-restaurants__guests-dec disabled">-</div>' : '';
				item.innerHTML = `
				${number}
				<div class="modal-restaurants__location">
					<div>Location:</div><div class="modal-restaurants__location-val">${element.location}</div>
				</div>
				<div class="modal-restaurants__date">
					<div>Date:</div><div class="modal-restaurants__date-val">${element.date}</div>
				</div>
				<div class="modal-restaurants__time">
				<div>Time:</div><div data-range="${element.time}" class="modal-restaurants__time-val">${getFirst(element.time, "time")}</div>${timeBtns}
				</div>
				<div class="modal-restaurants__guests">
					<div>Guests:</div><div data-range="${element.guests}" class="modal-restaurants__guests-val">${getFirst(element.guests, "guests")}</div>${guestsBtns}
				</div>
				<button data-book class="modal-restaurants__book">
					Book!
				</button>
				`;
				parent.appendChild(item);
			})
			bindOptionBtns('.modal-restaurants__time-dec', '.modal-restaurants__time-inc', '.modal-restaurants__time-val', "time");
			bindOptionBtns('.modal-restaurants__guests-dec', '.modal-restaurants__guests-inc', '.modal-restaurants__guests-val');
		}
	}


	// Change values in form options (only in items that fit by location)
	function changeOption(range, type, way, current) {
		let content = +current.match(/^\d+/);
		if (current.match(/\pm$/i)) {
			content +=  12;
		}

		let onStart = true,
			onEnd;

		const start = +range.match(/^\d+/),
		  	  end = +range.match(/\d+$/);

		way === "+" ? content++ : content--;

		onStart = content <= start;
		onEnd = content >= end;
		

		if (type === "time") {
			content = content > 12 ? content - 12 + '.00 PM' : content + '.00 AM';
		}
		return {content, start: onStart, end: onEnd};
	}

	// Get sibling element with parent
	function getSibling(selector, parentSelector) {
		return this.closest(parentSelector) ? this.closest(parentSelector).querySelector(selector) : false;
	}

	// bind buttons for changing options
	function bindOptionBtns(btnsPrevSelector, btnsNextSelector, contentSelector, type) {
		const btnsPrev = document.querySelectorAll(btnsPrevSelector),
			  btnsNext = document.querySelectorAll(btnsNextSelector);

		function bindBtns(btns, way) {
			btns.forEach(btn => {
				btn.addEventListener('click', e => {
					e.stopImmediatePropagation();

					const content = getSibling.call(btn, contentSelector, '.by-location'),
						range = content.getAttribute('data-range');
					let answer = changeOption(range, type, way, content.innerHTML);
					content.innerHTML = answer.content;

					getSibling.call(btn, btnsPrevSelector, '.by-location').classList.remove('disabled');
					getSibling.call(btn, btnsNextSelector, '.by-location').classList.remove('disabled');

					if (answer.start === true && way === '-') {
						e.target.classList.add('disabled');
					} else if (answer.end === true && way === '+') {
						e.target.classList.add('disabled');
					}
				})
			})
		}

		bindBtns(btnsPrev, "-");
		bindBtns(btnsNext, "+");
	}

	triggerBtn.addEventListener('click', () => {
		createBookingItems();
	})


	// SECOND MODAL WINDOW (BOOKING FORM)
	const content = document.querySelector('.modal-restaurants__content');

	function renderBookingFormValues(btnSibling) {
		const locationContainer = document.querySelector('.modal-restaurant-booking__location-val'),
			  dateContainer = document.querySelector('.modal-restaurant-booking__date-val'),
			  timeContainer = document.querySelector('.modal-restaurant-booking__time-val'),
		  	  guestsContainer = document.querySelector('.modal-restaurant-booking__guests-val');

		const changeValue = (elem, valueSelector, ...containerSelectors) => {
			let sibling;
			containerSelectors.forEach(selector => {
				if (!sibling) {
				sibling = getSibling.call(btnSibling, valueSelector, selector) ? 
						  getSibling.call(btnSibling, valueSelector, selector) : '';
				}
			})
			elem.innerHTML = sibling.innerHTML;
		}

		changeValue(locationContainer, '.modal-restaurants__location-val', '.by-params', '.by-location', '.by-perfect');
		changeValue(dateContainer, '.modal-restaurants__date-val', '.by-params', '.by-location', '.by-perfect');
		changeValue(timeContainer, '.modal-restaurants__time-val', '.by-params', '.by-location', '.by-perfect');
		changeValue(guestsContainer, '.modal-restaurants__guests-val', '.by-params', '.by-location', '.by-perfect');

		document.dispatchEvent(new CustomEvent("rest-booking", {
			bubbles: true
		}));
	}

	content.addEventListener('click', e => {
		if (e.target.closest('[data-book]')) {
			renderBookingFormValues(e.target);
		}
	})

}

export default restaurantBooking;