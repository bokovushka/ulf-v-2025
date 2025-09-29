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


// modal next open
document.addEventListener('DOMContentLoaded', function () {
	const buttons = document.querySelectorAll('[data-next-modal]');

	buttons.forEach(function (btn) {
		btn.addEventListener('click', function () {
			const nextModalSelector = btn.getAttribute('data-next-modal');

			// Знайти поточне відкрите модальне вікно (найближчий .modal)
			const currentModal = btn.closest('.modal');

			if (currentModal) {
				// Закрити поточне
				$(currentModal).modal('hide');

				// Коли поточне модальне вікно закриється, відкриваємо нове
				$(currentModal).on('hidden.bs.modal', function () {
					$(nextModalSelector).modal('show');

					// Очистити event listener щоб не дублювались
					$(currentModal).off('hidden.bs.modal');
				});
			}
		});
	});
});

//mobile-menu
$(document).ready(function () {
	const $body = $('body');
	const $popupBg = $('.popup-bg-body');
	const $header = $('.header');
	const $menu = $('#navbarSupportedContent');

	// ===== Відкриття головного меню =====
	$menu.on('show.bs.collapse', function (e) {
		if (e.target !== this) return; // ігноруємо аккордеони всередині
		$body.addClass('lock');
		$popupBg.addClass('open');
		$header.addClass('menu-open');
	});

	// ===== Закриття головного меню =====
	$menu.on('hide.bs.collapse', function (e) {
		if (e.target !== this) return; // ігноруємо аккордеони всередині
		// нічого не видаляємо поки меню не закриється
	});

	// ===== Після завершення анімації закриття =====
	$menu.on('hidden.bs.collapse', function (e) {
		if (e.target !== this) return;
		$body.removeClass('lock');
		$popupBg.removeClass('open');
		$header.removeClass('menu-open');
	});

	// ===== Клік поза меню закриває головне меню =====
	$(document).mouseup(function (e) {
		const $target = $(e.target);
		if (
			!$header.is($target) &&
			$header.has($target).length === 0 &&
			!$target.closest('#header-mob-select-city').length &&
			!$target.closest('.select2-container').length
		) {
			if ($menu.hasClass('show')) {
				$('.navbar-toggler').trigger('click');
			}
		}
	});

	// ===== Закриття меню при ресайзі на десктоп =====
	$(window).on('resize', function () {
		if (window.innerWidth >= 1024 && $menu.hasClass('show')) {
			$('.navbar-toggler').trigger('click');
		}
	});
});

