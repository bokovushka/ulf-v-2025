import $ from 'jquery';
import { throttle } from 'lodash';

let lastScrollTop = 0;
let headerTopHeight = 0;
let headerMainHeight = 0;
let mainThreshold = 0;

// Оновлення значень висоти
function updateThresholds() {
	headerTopHeight = $(".header-top").outerHeight() || 0;
	headerMainHeight = $(".header-main").outerHeight() || 0;
	mainThreshold = headerTopHeight + headerMainHeight;

	// Відступ додаємо тільки від 1024px
	if ($(window).width() >= 1024) {
		$("main").css("margin-top", mainThreshold + "px");
	} else {
		$("main").css("margin-top", "");
	}

	updateHeroHeight();
}

// Оновлення висоти hero
// Оновлення висоти hero тільки від 1024px і якщо є клас vh-max
function updateHeroHeight() {
	if ($(".section-hero.vh-max").length) {
		if ($(window).width() >= 1024) {
			let headerTotalHeight = $(".header-top").outerHeight() + $(".header-main").outerHeight();
			$(".section-hero.vh-max").css("height", `calc(100vh - ${headerTotalHeight}px)`);
		} else {
			// Скидаємо на мобільних
			$(".section-hero.vh-max").css("height", "");
		}
	}
}

$(document).ready(function () {
	updateThresholds();

	$(window).on("resize", updateThresholds);

	$(window).on(
		"scroll",
		throttle(function () {
			let st = $(this).scrollTop();

			// Логіка тільки для 1024+
			if ($(window).width() >= 1024) {
				if (st > lastScrollTop) {
					// Скрол вниз
					$(".header-top").removeClass("header--show").addClass("header--hide");
					$(".header-main").removeClass("header--show").addClass("header--hide");
					$("main").css("margin-top", headerMainHeight + "px");
				} else {
					// Скрол вгору
					$(".header-top").removeClass("header--hide").addClass("header--show");
					$(".header-main").removeClass("header--hide").addClass("header--show");
					$("main").css("margin-top", mainThreshold + "px");
				}
			}

			// Топ шапки тільки від 1024
			if ($(window).width() >= 1024) {
				if (st > headerTopHeight) {
					$(".header-top").css("top", `-${headerTopHeight}px`);
					$(".header-main").css("top", "0");
				}

				if (st <= headerTopHeight || st < lastScrollTop) {
					$(".header-top").css("top", "0");
					$(".header-main").css("top", `${headerTopHeight}px`);
				}
			} else {
				// Скидаємо стилі на мобільних
				$(".header-top, .header-main").css("top", "");
			}

			lastScrollTop = st;

			// оновлюємо hero при скролі, бо шапка міняється
			updateHeroHeight();
		}, 100)
	);
});
