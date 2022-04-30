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
	function renderList(listConteiner, listOptions, chosenOptionContainer) {
		listConteiner.innerHTML = "";

		listOptions.forEach(option => {
			const elem = document.createElement('li');
			elem.textContent = option;
			listConteiner.appendChild(elem);
		})

		if (chosenOptionContainer) {
			changeOption(chosenOptionContainer, listOptions[0]);
		}
	}

	// sort all dates 
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

	//Create array of time (8.00 Am, 9.00 AM, 10.00 AM ...), according to chosen date
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

	function changeOption(container, value) {
		// fix bug whitch allowed in short perion of time click 'ul' insted of 'li', 
		// and choose all 'li' elements as value argument
		if (!value.match(/li/)) {
			container.textContent = value;
		}
	}
 
	// Change chosen option when click on another option in list
	function bindOption (elemsParent, option, type) {
		elemsParent.addEventListener('click', e => {
			if (e.target.tagNmae = 'LI') {
				changeOption(option, e.target.innerHTML);
			}
			if (type === 'date') {
				renderList(timeList, createTimes(e.target.innerHTML, receivedRestaurants), timeOption);
			}
		});
	}

	bindOption(dateList, dateOption, 'date');
	bindOption(timeList, timeOption);
	bindOption(guestList, guestOption);

}

export default restaurantsOptions;