var btn = $('#btnTop');

$(window).on('scroll', function () {
	btn.toggleClass('show', $(window).scrollTop() > 122);
});

btn.on('click', function (e) {
	e.preventDefault();
});
