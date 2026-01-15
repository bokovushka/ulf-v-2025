import jQuery from 'jquery';

jQuery(function ($) {
	const btn = $('#btnCall');
	const footer = $('footer');
	const offset = 30; // "мінус 30" = footerTop + 30

	function toggleAtFooterClass() {
		if (!footer.length || !btn.length) return;

		const winBottom = $(window).scrollTop() + $(window).height();
		const footerTop = footer.offset().top;

		// додаємо клас, коли низ viewport зайшов на 30px в футер
		const reached = winBottom >= (footerTop + offset);

		btn.toggleClass('at-footer', reached);
	}

	toggleAtFooterClass();
	$(window).on('scroll resize', toggleAtFooterClass);
});
