const menu = (btnSelector, closeSelector, menuSelector, menuContentSelector) => {
	const btn = document.querySelector(btnSelector),
		  menu = document.querySelector(menuSelector),
		  menuContent = menu.querySelector(menuContentSelector);

	function showMenu () {
		menu.style.display = 'block';
		
		menu.classList.remove('animate__fadeOut');
		menu.classList.add('animate__animated', 'animate__fadeIn');

		menuContent.classList.remove('animate__fadeOutLeft');
		menuContent.classList.add('animate__animated', 'animate__fadeInLeft');

		btn.classList.remove('animate__fadeIn');
		btn.classList.add('animate__animated', 'animate__fadeOut');
	}

	function hideMenu () {
		btn.classList.remove('animate__fadeOut');

		menu.classList.remove('animate__fadeIn');
		menu.classList.add('animate__animated', 'animate__fadeOut');
		
		menuContent.classList.remove('animate__fadeInLeft');
		menuContent.classList.add('animate__animated', 'animate__fadeOutLeft');

		setTimeout(() => {
			menu.style.display = 'none';
		}, 400);

		btn.classList.add('animate__animated', 'animate__fadeIn');
	}

	window.addEventListener('resize', () => {
		if (window.innerWidth > 1300) {
			hideMenu();
		}
	})

	btn.addEventListener('click',  showMenu);
	menu.addEventListener('click', e => {
		if (e.target.closest(closeSelector)) {
			hideMenu();
		} else {
			menu.querySelectorAll('a').forEach(element => {
				if (element === e.target) {
					hideMenu();
				}
			});
		}
	})
}

export default menu;