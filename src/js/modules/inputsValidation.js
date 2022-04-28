const inputValidation = () => {
	const nameInputs = document.querySelectorAll('[ data-name]');

	nameInputs.forEach(input => {
		input.addEventListener('input', () => {
			input.value = input.value.replace(/\d/g, '');
		});
	})
}

export default inputValidation;