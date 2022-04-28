const accordion = () => {
	const bindAccordion = (contentActiveClass, contentItemsSelector, triggersActiveClass, triggersItemsSelector) => {
		const items = document.querySelectorAll(contentItemsSelector),
			  triggers = document.querySelectorAll(triggersItemsSelector);	

		function show(trigger, content) {
			items.forEach((item, i) => {
				hide(triggers[i], item);
			})
	
			content.classList.add(contentActiveClass);
			trigger.classList.add(triggersActiveClass);
		}
	
		function hide(trigger, content) {
			content.classList.remove(contentActiveClass);
			trigger.classList.remove(triggersActiveClass);
		}

		triggers.forEach((trigger, i) => {
			trigger.addEventListener('click', () => {
				if (trigger.classList.contains(triggersActiveClass) && items[i].classList.contains(contentActiveClass)) {
					hide(trigger, items[i]);
				} else {
					show(trigger, items[i]);
				}
			})
		})
	}

	bindAccordion('opened', '[data-accordion]', 'modal-restaurants__title-opened', '.modal-restaurants__title');

	

}

export default accordion;