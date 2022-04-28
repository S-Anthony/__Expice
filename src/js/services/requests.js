const postData = async (url, data, state) => {

	let formData;

	formData = new FormData(data);
	if (state) {
		for (let key in state) {
			formData.append(key, state[key]);
		}
	}

	let responce = await fetch(url, {
		method : 'POST',
		body: formData
	});

	if (!responce.ok) {
		throw Error(responce.statusText);
	}

	return await responce.text();
};

const getResources = async (url) => {

	let responce = await fetch(url);

	if (!responce.ok) {
		throw Error(responce.statusText);
	}

	return await responce.json();
};

export {postData, getResources};