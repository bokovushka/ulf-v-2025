import $ from 'jquery';

$(document).ready(function () {
	let body_lock = document.querySelector('body');
	let menuBtn = document.querySelector('.navbar-toggler');
	let bgBody = document.querySelector('.popup-bg-body');
	let header = document.querySelector('.header');
	let isMenuEnabled = true;

	menuBtn.addEventListener('click', function (event) {
		if (!isMenuEnabled) {
			event.preventDefault();
		} else {
			body_lock.classList.add('lock');
			bgBody.classList.add('open');
			header.classList.add('menu-open'); // ✅ додаємо клас до хедера
			isMenuEnabled = false;

			setTimeout(function () {
				isMenuEnabled = true;
			}, 1000);
		}
	});

	setInterval(function () {
		if ($(bgBody).hasClass('collapsed')) {
			body_lock.classList.remove('lock');
			bgBody.classList.remove('open');
			header.classList.remove('menu-open'); // ✅ прибираємо клас з хедера
		}
	}, 100);
});

//? закриття меню поза областю
$(document).mouseup(function (e) {
	if (!$(".header").is(e.target) && $(".header").has(e.target).length === 0) {
		$('.popup-bg-body').removeClass("open");
		$('body').removeClass("lock");
		$('.header').removeClass("menu-open"); // ✅ також прибираємо при кліку поза
	}
});

//? закриття popup-bg-body і мобільного меню при поворотах наприклад на планшетці
setInterval(function () {
	if (window.innerWidth >= 1024) {
		if ($(".navbar-collapse").hasClass("show")) {
			$('.navbar-toggler').click();
			$('.header').removeClass("menu-open"); // ✅ і тут теж
		}
	}
}, 1000);
