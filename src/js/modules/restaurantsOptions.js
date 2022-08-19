const restaurantsOptions = (receivedRestaurants) => {
	const dateList = document.querySelector('.booking__params-date .booking__params-dropdown ul'),
	      timeList = document.querySelector('.booking__params-time .booking__params-dropdown ul'),
	      guestList = document.querySelector('.booking__params-guests .booking__params-dropdown ul'),
		  dateOption = document.querySelector('.booking__params-date .booking__params-param'),
		  guestOption = document.querySelector('.booking__params-guests .booking__params-param'),
		  timeOption = document.querySelector('.booking__params-time .booking__params-param'),
	      dates = sortDates(receivedRestaurants),
		  times = createTimes(dates[0], receivedRestaurants),
		  guests = createGuests(receivedRestaurants);

	renderList(dateList, dates, dateOption);
	renderList(timeList, times, timeOption);
	renderList(guestList, guests, guestOption);

	// Render list of options in dropdown Elem
	function renderList(listContainer, listOptions, chosenOptionContainer, optionToRemove) {
		listContainer.innerHTML = "";

		// Add all elements except chosen one to list
		for (const option of listOptions) {
			if (optionToRemove) {
				if (optionToRemove === option) {
					continue;
				}
			}
			const elem = document.createElement('li');
				elem.textContent = option;
				listContainer.appendChild(elem);
		}

		if (chosenOptionContainer) {
			// Set chosen option to the first available option in the list
			changeOption(chosenOptionContainer, listOptions[0], listContainer, listOptions);
		}
	}

	// Sort all dates 
	function sortDates(jsonArr) {
		const allDates = new Set();
		jsonArr.forEach(obj => {
			for (let key in obj.dates) {
				allDates.add(key);
			}
		});

		const arrSet = Array.from(allDates);
		arrSet.sort((a, b) => {
			if (+a.match(/\d+$/) < +b.match(/\d+$/)) {
				return -1;
			} else if (+a.match(/\d+$/) > +b.match(/\d+$/)) {
				return 1;
			} 

			if (+a.match(/\d+(?=-\d+$)/) < +b.match(/\d+(?=-\d+$)/)) {
				return -1;
			} else if (+a.match(/\d+(?=-\d+$)/) > +b.match(/\d+(?=-\d+$)/)) {
				return 1;
			} 

			if (+a.match(/^\d+/) < +b.match(/^\d+/)) {
				return -1;
			} else if (+a.match(/^\d+/) > +b.match(/^\d+/)) {
				return 1;
			}
			
			return 0;
		})

		return arrSet;
	}

	// Create array of time (8.00 Am, 9.00 AM, 10.00 AM ...), according to chosen date
	function createTimes(date, jsonArr) {
		let startTime = 12,
			endTime = 0;

		jsonArr.forEach(obj => {
			for (let key in obj.dates) {

				if (date === key) {
					const start = +obj.dates[key].match(/^\d+/);
					const end = +obj.dates[key].match(/\d+$/);
	
					startTime > start ? startTime = start : startTime;
					endTime < end ? endTime = end : endTime;
				}
			}
		})

		const times = [];
		for (startTime; startTime < endTime+1; startTime++) {
			startTime > 12 ? times.push(`${startTime - 12}.00 PM`) : times.push(startTime + '.00 AM');
		}
		return times;
	}

	// Get guests range from object
	function createGuests(jsonArr) {
		const guests = new Set();
		let min = 5,
			max = 0;
		jsonArr.forEach(obj => {
			const start = +obj.guests.match(/^\d+/);
			const end = +obj.guests.match(/\d+$/);

			min > start ? min = start : min;
			max < end ? max = end : max;
		});
		for (min; min < max+1; min++) {
			min <= 1 ? guests.add(`${min} Person`) : guests.add(`${min} People`);
		}
		return Array.from(guests);
	}

	function changeOption(container, value, listContainer, listOptions) {
		// bug fix whitch allowed in short perion of time click 'ul' insted of 'li', 
		// and choose all 'li' elements as value argument
		if (value && !value.match(/<li>/)) {
			container.textContent = value;
		}

		// Rerender list with deleting chosen element
		if (listContainer && listOptions) {
			renderList(listContainer, listOptions, '', value);
		}
	}
 
	// Change chosen option when click on another option in list
	function bindOption (elemsParent, list, option, type) {
		elemsParent.addEventListener('click', e => {
			if (e.target.tagNmae = 'LI') {
				changeOption(option, e.target.innerHTML, elemsParent, list);
			}
			if (type === 'date') {
				renderList(timeList, createTimes(e.target.innerHTML, receivedRestaurants), timeOption);
			}
		});
	}

	bindOption(dateList, dates, dateOption, 'date');
	bindOption(timeList, times, timeOption);
	bindOption(guestList, guests, guestOption);
}

export default restaurantsOptions;