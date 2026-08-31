$(document).on('click', 'a.anchor[href^="#"]', function (e) {
	e.preventDefault();

	var targetSelector = $(this).attr('href');
	var $target = $(targetSelector);

	if ($target.length) {
		var currentScroll = $(window).scrollTop();
		var targetTop = $target.offset().top;
		var offset;

		// Якщо екран 1024px і менше — завжди 80px
		if ($(window).width() <= 1024) {
			offset = 80;
		} else {
			// На десктопі: вниз — 84px, вгору — 134px
			offset = (targetTop > currentScroll) ? 84 : 134;
		}

		$('html, body').stop().animate({
			scrollTop: targetTop - offset
		}, 800);
	}
});