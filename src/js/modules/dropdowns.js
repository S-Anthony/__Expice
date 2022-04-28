const dropdowns = () => {
	const bindDropdown = (triggerSelector, dropdownClass, activeClass, dropdownsForClosing) => {
		const dropdown = document.querySelector(dropdownClass);

		function showDropdown (dropdown) {
			dropdown.classList.add(activeClass);
			if (dropdownsForClosing) {
				dropdownsForClosing.forEach(item => {
					hideDropdown(document.querySelector(item));
				})
			}
		}
		function hideDropdown (dropdown) {
			dropdown.classList.remove(activeClass);
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
	bindDropdown('.booking__params-date', '.booking__params-date .booking__params-dropdown', 'active', ['.booking__params-time .booking__params-dropdown', '.booking__params-guests .booking__params-dropdown']);
	bindDropdown('.booking__params-time', '.booking__params-time .booking__params-dropdown', 'active', ['.booking__params-date .booking__params-dropdown', '.booking__params-guests .booking__params-dropdown']);
	bindDropdown('.booking__params-guests', '.booking__params-guests .booking__params-dropdown', 'active', ['.booking__params-time .booking__params-dropdown', '.booking__params-date .booking__params-dropdown']);

}

export default dropdowns;