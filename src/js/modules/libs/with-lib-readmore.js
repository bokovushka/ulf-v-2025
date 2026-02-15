import $ from 'jquery';
import '../../../../node_modules/readmore-js/readmore.min.js';

$(document).ready(function () {
	function initializeReadmore() {
		$('.spoiler-seo').readmore({
			speed: 75,
			collapsedHeight: false,
			moreLink: '<button class="btn-read-more btn rounded-0 mt-3 p-0">Показати більше</button>',
			lessLink: '<button class="btn-read-more btn rounded-0 mt-3 p-0">Показати менше</button>'
		});
	}

	// Initialize on document ready
	initializeReadmore();

	// Reinitialize on window resize
	$(window).resize(function () {
		initializeReadmore();
	});


});

