const dropdowns = () => {
	const bindDropdown = (triggerSelector, dropdownClass, activeClass) => {
		const allDropdowns = document.querySelectorAll('.booking__params-dropdown');
		const dropdown = document.querySelector(dropdownClass);

		function showDropdown (dropdown) {
			allDropdowns.forEach(item => {
				hideDropdown(item);
			})
			dropdown.classList.add(activeClass);
			document.querySelector(triggerSelector).classList.add('dropdown-active');
			dropdown.addEventListener('mouseleave', () => {
				hideDropdown(dropdown);
			});
		}

		function hideDropdown (dropdown) {
			dropdown.classList.remove(activeClass);
			document.querySelector(triggerSelector).classList.remove('dropdown-active');
		}

		document.addEventListener('click', e => {
			if (e.target.closest(triggerSelector)) {
				if (dropdown.classList.contains(activeClass) && !e.target.closest(dropdownClass)) {
					hideDropdown(dropdown);
				} else {
					showDropdown(dropdown);
				}
			} else if (!e.target.closest(dropdownClass) && !e.target.closest(triggerSelector)) {
				hideDropdown(dropdown);
			}
		})
	}

	bindDropdown('.header__user', '.header__user-list', 'header__user-list-active');
	bindDropdown('.mobile-menu .header__user', '.mobile-menu .header__user .header__user-list', 'header__user-list-active');
	bindDropdown('.booking__params-date', '.booking__params-date .booking__params-dropdown', 'active');
	bindDropdown('.booking__params-time', '.booking__params-time .booking__params-dropdown', 'active');
	bindDropdown('.booking__params-guests', '.booking__params-guests .booking__params-dropdown', 'active');

}

export default dropdowns;