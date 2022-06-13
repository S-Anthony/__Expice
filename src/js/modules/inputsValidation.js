const inputValidation = () => {
	const nameInputs = document.querySelectorAll('[ data-name]'), 
		  searchInput = document.querySelector('.preview__search input');

	nameInputs.forEach(input => {
		input.addEventListener('input', () => {
			input.value = input.value.replace(/\d/g, '');
		});
	})

	searchInput.addEventListener('input', () => {
		searchInput.value = searchInput.value.replace(/[^a-z\s\-_]/gi, '');
	});
}

export default inputValidation;