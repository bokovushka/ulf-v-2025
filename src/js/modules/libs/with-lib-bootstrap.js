import $ from 'jquery';
// import { createPopper } from '@popperjs/core';
import 'bootstrap';


$(document).on('click', '.i-info', function (e) {
	e.preventDefault();
	e.stopPropagation();

	// сховати всі інші
	$('.i-info').not(this).popover('hide');

	const isSmall = window.innerWidth <= 575; // перевірка для мобільних

	if (!$(this).data('bs.popover')) {
		$(this).popover({
			html: true,
			trigger: 'manual',
			placement: isSmall ? 'right' : 'top',
			container: '.benefits-partners',
			content: function () {
				return $($(this).data('target')).html();
			}
		}).popover('show');

		// на малих можна підправити позицію вручну, якщо потрібно
		if (isSmall) {
			const pop = $(this).data('bs.popover').tip;
			$(pop).css({ maxWidth: '200px' }); // наприклад, обмежуємо ширину
		}
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
