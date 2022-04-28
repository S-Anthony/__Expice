import menu from './modules/menu';
import dropdowns from './modules/dropdowns';
import forms from './modules/forms';
import Swiper from '../assets/libs/swiper/swiper-bundle.esm.browser';
import modals from './modules/modals';
import more from './modules/more';
import restaurantsOptions from './modules/restaurantsOptions';
import restaurantBooking from './modules/restaurantBooking';
import accordion from './modules/accordion';
import changeModalState from './modules/changeModalState';
import search from './modules/search';
import {getResources} from './services/requests';
import scrolling from './modules/scroll';
import mask from './modules/phoneMask';
import cart from './modules/cart';
import inputValidation from './modules/inputsValidation';


document.addEventListener("DOMContentLoaded", () => {
	'use strict';

	let modalState = {};

	getResources('./db.json')
	.then(res => {
		more(res.food);
		restaurantsOptions(res.restaurants);
		restaurantBooking(res.restaurants);
		search(res.food, res.restaurants);
		cart(res.food);
	})
	.catch(() => {
		document.dispatchEvent(new CustomEvent("fail"));
	})

	inputValidation();
	changeModalState(modalState);
	menu('.header__button-burger', '.mobile-menu__close', '.mobile-menu', '.mobile-menu__content');
	dropdowns();
	forms(modalState);
	modals();
	accordion();
	scrolling();
	mask('[data-phone]');

	const swiper = new Swiper('.preview__slider-wrapper', {
		loop: true,
		navigation: {
		  nextEl: '.preview__slider-right-arrow',
		  prevEl: '.preview__slider-left-arrow',
		},
		autoplay: {
			delay: 5000,
		  },
	  });
});