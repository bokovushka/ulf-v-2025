import $ from 'jquery';
// import { createPopper } from '@popperjs/core';
import 'bootstrap';


// делегування через document
$(document).on('click', '.i-info', function (e) {
	e.preventDefault();
	e.stopPropagation();

	// сховати всі інші
	$('.i-info').not(this).popover('hide');

	// створити / показати
	if (!$(this).data('bs.popover')) {
		$(this).popover({
			html: true,
			trigger: 'manual',
			placement: 'top',
			container: 'body',
			content: function () {
				return $($(this).data('target')).html();
			}
		}).popover('show');
	} else {
		$(this).popover('toggle');
	}
});

// закрити по кліку поза
$(document).on('click', function (e) {
	if (!$(e.target).closest('.popover, .i-info').length) {
		$('.i-info').popover('hide');
	}
});
