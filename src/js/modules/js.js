function setHeroHeight() {
	let h = window.innerHeight;

	// якщо екран вузький і зараз landscape → збільшити у 2 рази
	if (window.innerWidth < 768 && window.matchMedia('(orientation: landscape)').matches) {
		h = h * 2;
	}

	document.documentElement.style.setProperty('--hero-height', `${h}px`);
}

// одразу при завантаженні
setHeroHeight();

// при зміні орієнтації
window.addEventListener('orientationchange', () => {
	setHeroHeight();
	window.addEventListener('resize', setHeroHeight, { once: true });
});


// catalog-item color
document.addEventListener("DOMContentLoaded", () => {
	const colorName = document.querySelector(".car-calc--color-name");
	const colorItems = document.querySelectorAll(".color-picker--item");

	colorItems.forEach(item => {
		item.addEventListener("click", () => {
			// active class
			colorItems.forEach(el => el.classList.remove("active"));
			item.classList.add("active");

			// text change
			const name = item.dataset.color;
			if (name) {
				colorName.textContent = name;
			}
		});
	});
});


// оновленнязображень під кнопками

document.addEventListener('DOMContentLoaded', () => {
	const section = document.querySelector('.section-what-finance');
	if (!section) return;

	const switchButtons = section.querySelectorAll('.btn-switch');
	const imgConfigs = [
		{ selector: '.bg-img-lg', attr: 'data-img-lg' },
		{ selector: '.bg-img-md', attr: 'data-img-md' },
		{ selector: '.bg-img-sm', attr: 'data-img-sm' }
	];

	function crossFadeImage(targetImg, newSrc) {
		if (!targetImg || !newSrc || targetImg.getAttribute('src') === newSrc) return;

		// 1. Створюємо тимчасовий клон із новим джерелом
		const tempImg = targetImg.cloneNode(true);
		tempImg.classList.add('bg-temp-fade');
		tempImg.src = newSrc;

		// 2. Вставляємо його відразу після оригінальної картинки
		targetImg.after(tempImg);

		// 3. Чекаємо завантаження нового зображення і плавно робимо його видимим
		tempImg.onload = () => {
			// Примусовий reflow для спрацювання CSS transition
			void tempImg.offsetWidth;
			tempImg.classList.add('is-visible');

			// 4. Після завершення анімації (400мс) оновлюємо оригінал і прибираємо клон
			setTimeout(() => {
				targetImg.src = newSrc;
				tempImg.remove();
			}, 400);
		};
	}

	switchButtons.forEach(btn => {
		btn.addEventListener('click', () => {
			if (btn.classList.contains('active')) return;

			switchButtons.forEach(b => b.classList.remove('active'));
			btn.classList.add('active');

			imgConfigs.forEach(({ selector, attr }) => {
				const img = section.querySelector(selector);
				const newSrc = btn.getAttribute(attr);
				crossFadeImage(img, newSrc);
			});
		});
	});
});