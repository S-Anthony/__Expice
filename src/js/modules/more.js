const more = (receivedFood) => {
	const moreBtn = document.querySelector('.food__more'),
		  elemsContainer = document.querySelector('.food__items');	

	function createElements(arr) {
		const items = [];
		arr.forEach(obj => {
			const elem = document.createElement('div');
			elem.classList.add('food__item');
			elem.style.display = "none";
			elem.setAttribute("id", `food-item-${obj.id}`);
			elem.innerHTML = `
				<div class="food__img">
					<picture>
						<source type="image/webp" srcset="${obj.src.replace(/[^.]+$/, 'webp')}">
						<source type="image/jpeg" srcset="${obj.src}">
						<img src="${obj.src}" alt="food">
					</picture>
				</div>
				<div class="food__info">
					<div class="food__info-title">${obj.name}</div>
					<div class="food__info-text">${obj.descriptions}</div>
					<div class="food__info-btn-wrapper">
						<div class="food__info-location">${obj.location}</div>
						<div class="food__info-btn">Book Now</div>
					</div>
				</div>
			`;
			items.push(elem);
		})
		return items;
	}

	function renderElements(arr, container) {
		createElements(arr).forEach(element => {
			container.appendChild(element);
		})
	}

	function showItems (btn, container) {
		renderElements(receivedFood, elemsContainer);
		btn.classList.add('food__more_opened');
		container.classList.add('animate__animated', 'animate__fadeIn');
		container.classList.add('food__items_opened');
		document.querySelectorAll('.food__item').forEach(item => {
			item.style.display = 'block';
		})
	}

	moreBtn.addEventListener('click', () => {
		showItems(moreBtn, elemsContainer);
	})
	document.addEventListener('have-to-render-food', () => {
		showItems(moreBtn, elemsContainer);
	})
}

export default more;