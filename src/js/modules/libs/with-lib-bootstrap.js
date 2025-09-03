import $ from 'jquery';
// import { createPopper } from '@popperjs/core';
import 'bootstrap';


//? tooltip info field
$(function () {
	var tooltipFieldError = ['<div class="tooltip tooltip-help-info" role="tooltip">',
		'<div class="tooltip-inner">',
		'</div>',
		'</div>'].join('');
	$('.i-info').tooltip({
		trigger: "hover", //hover focus click manual
		html: true,
		placement: "top",
		template: tooltipFieldError,
		// fallbackPlacement: [], // строго в заданому напрямку, не дає можливості при скролі позиціонувати в інші сторони
	});
});