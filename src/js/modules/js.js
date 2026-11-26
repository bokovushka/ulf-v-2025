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

// .esg-sidebar nav active
document.addEventListener('click', (e) => {
	const link = e.target.closest('.esg-sidebar nav .anchor');
	if (!link) return;

	const nav = link.closest('nav');
	nav.querySelectorAll('.anchor').forEach((item) => {
		item.classList.remove('active');
	});

	link.classList.add('active');
});


(function () {
	const nav = document.querySelector('.esg-sidebar nav');
	if (!nav) return;

	const links = Array.from(nav.querySelectorAll('.anchor'));
	if (!links.length) return;

	const sections = links
		.map((link) => {
			const href = link.getAttribute('href');
			const target = href && href.startsWith('#') ? document.querySelector(href) : null;
			return target ? { link, target } : null;
		})
		.filter(Boolean);

	if (!sections.length) return;

	let isAutoScrolling = false;
	let autoScrollTimer = null;

	// Не заважаємо штатному кліку по табу, поки триває плавний скрол до якоря
	document.addEventListener('click', (e) => {
		if (!e.target.closest('.esg-sidebar nav .anchor')) return;
		isAutoScrolling = true;
		clearTimeout(autoScrollTimer);
		autoScrollTimer = setTimeout(() => {
			isAutoScrolling = false;
		}, 900);
	}, true);

	// Щойно користувач скролить сам — одразу вмикаємо відстеження
	const enableManualSpy = () => {
		if (isAutoScrolling) {
			isAutoScrolling = false;
			clearTimeout(autoScrollTimer);
		}
	};

	window.addEventListener('wheel', enableManualSpy, { passive: true });
	window.addEventListener('touchmove', enableManualSpy, { passive: true });

	const getOffsetLine = () => {
		const sidebar = document.querySelector('.esg-sidebar');
		const headerMain = document.querySelector('.header-main');
		const headerTop = document.querySelector('.header-top');

		if (window.innerWidth <= 1023) {
			if (sidebar) {
				const rect = sidebar.getBoundingClientRect();
				if (rect.bottom > 0 && rect.top < window.innerHeight * 0.5) {
					return rect.bottom + 30;
				}
			}
			return 170;
		}

		let bottom = 0;
		if (headerMain) bottom = Math.max(bottom, headerMain.getBoundingClientRect().bottom);
		if (headerTop && headerTop.classList.contains('header--show')) {
			bottom = Math.max(bottom, headerTop.getBoundingClientRect().bottom);
		}
		return Math.max(0, bottom) + 140;
	};

	const syncActiveTab = () => {
		if (isAutoScrolling) return;

		const scrollTop = window.scrollY || document.documentElement.scrollTop || 0;
		const offsetLine = getOffsetLine();

		let activeLink = sections[0].link;

		// Якщо доскролили до самого дна — активний останній таб
		if (scrollTop + window.innerHeight >= document.documentElement.scrollHeight - 10) {
			activeLink = sections[sections.length - 1].link;
		} else if (scrollTop > 20) {
			for (let i = 0; i < sections.length; i++) {
				if (sections[i].target.getBoundingClientRect().top <= offsetLine) {
					activeLink = sections[i].link;
				} else {
					break;
				}
			}
		}

		if (!activeLink.classList.contains('active')) {
			links.forEach((item) => item.classList.remove('active'));
			activeLink.classList.add('active');
		}
	};

	window.addEventListener('scroll', syncActiveTab, { passive: true });
	window.addEventListener('resize', syncActiveTab);
})();

//esg-documents
document.querySelectorAll('.esg-documents').forEach((list) => {
	const moreBtn = list.nextElementSibling;
	if (!moreBtn || !moreBtn.classList.contains('esg-documents--more')) return;

	const items = Array.from(list.querySelectorAll('.item'));
	const hiddenItems = items.slice(4);
	const textEl = moreBtn.querySelector('.btn-text');

	if (hiddenItems.length === 0) {
		moreBtn.style.display = 'none';
		return;
	}

	moreBtn.addEventListener('click', () => {
		const isExpanded = list.classList.toggle('is-expanded');
		moreBtn.classList.toggle('is-active', isExpanded);

		hiddenItems.forEach((item) => {
			if (isExpanded) {
				// Встановлюємо точну висоту елемента з урахуванням вертикальних падінгів (16px + 16px = 32px)
				item.style.maxHeight = `${item.scrollHeight + 32}px`;
			} else {
				item.style.maxHeight = '';
			}
		});

		if (textEl) {
			textEl.textContent = isExpanded ? 'Згорнути' : 'Показати усі';
		}
	});
});