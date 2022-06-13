const search = (receivedFood, receivedRestaurants) => {
	const renderedFood = document.querySelectorAll('.food__item'),
		  searchButton = document.querySelector('.button.button_main'),
		  input = document.querySelector('.preview__search input');

	function compare() {
		let matchedElem,
			type;
		if (input.value.length > 1) {
			const inputValue = input.value.match(/[a-z]/gi).join('').toLowerCase();
			// compare food items from markup
			renderedFood.forEach(food => {
				const foodName = food.querySelector('.food__info-title').textContent.match(/[a-z]/gi).join('').toLowerCase();
				if (foodName === inputValue) {
					matchedElem = `#${food.getAttribute('id')}`;
					type = "renderedFood";
				}			
			})
			// compare food items from server
			if (!matchedElem) {
				receivedFood.forEach(food => {
					const foodName = food.name.match(/[a-z]/gi).join('').toLowerCase();
					if (foodName === inputValue) {
						matchedElem = `#food-item-${food.id}`;
						type = "receivedFood";
					}
				})
			}
			// compare restaurants from server
			if (!matchedElem) {
				receivedRestaurants.forEach(restaurant => {
					const itemName = restaurant.location.match(/[a-z]/gi).join('').toLowerCase();
					if (itemName === inputValue) {
						matchedElem = restaurant.location;
						type = "restaurant";
					}
				})
			}
		}
		input.value = '';
		return {matchedElem, type};
	}


	// scroll to the matched element, by dispatching custom event "match"
	searchButton.addEventListener('click', () => {
		const {matchedElem, type} = compare();
		if (matchedElem) {
			if (type === "renderedFood") {
				document.dispatchEvent(new CustomEvent("match", {
					detail: {
						id: matchedElem
					}
				}));
			} else if (type === "receivedFood") {
				if (!document.querySelector(matchedElem)) {
					document.dispatchEvent(new CustomEvent("have-to-render-food"));
				}
					document.dispatchEvent(new CustomEvent("match", {
						detail: {
							id: matchedElem
						}
					}));
			} else if (type === "restaurant") {
				document.querySelector('#booking input').value = matchedElem;
				document.dispatchEvent(new CustomEvent("match", {
					detail: {
						id: '#booking'
					}
				}));
			} 
		} else {
			document.dispatchEvent(new CustomEvent("search-fail"));
		}
	})
}

export default search;