document.querySelectorAll('.esg-reporting-news').forEach((section) => {
	const grid = section.querySelector('.esg-reporting-news--grid');
	const items = Array.from(section.querySelectorAll('.esg-reporting-news--item'));
	const moreBtn = section.querySelector('.esg-reporting-news--more-btn');
	const counterEl = section.querySelector('.esg-reporting-news--counter');
	const footer = section.querySelector('.esg-reporting-news--footer');

	if (!grid || items.length === 0) return;

	const mobileQuery = window.matchMedia('(max-width: 767px)');
	const getStep = () => (mobileQuery.matches ? 5 : 6);

	let visibleCount = getStep();
	const totalCount = parseInt(grid.dataset.total, 10) || items.length;

	const renderState = () => {
		const currentShown = Math.min(visibleCount, items.length);

		items.forEach((item, index) => {
			item.classList.toggle('is-hidden', index >= currentShown);
		});

		if (counterEl) {
			counterEl.textContent = `Показано ${currentShown} з ${totalCount}`;
		}

		if (moreBtn) {
			moreBtn.style.display = currentShown >= totalCount ? 'none' : '';
		}

		// Якщо всі картки вмістилися одразу в перший екран — ховаємо весь футер
		if (footer && totalCount <= getStep()) {
			footer.style.display = 'none';
		}
	};

	if (moreBtn) {
		moreBtn.addEventListener('click', () => {
			visibleCount += getStep();
			renderState();
		});
	}

	// При першому завантаженні підлаштовуємо кількість під ширину екрана (5 або 6)
	mobileQuery.addEventListener('change', () => {
		const step = getStep();
		if (visibleCount < step) {
			visibleCount = step;
		}
		renderState();
	});

	renderState();
});

document.querySelectorAll('.all-news').forEach((section) => {
	const filterBtns = Array.from(section.querySelectorAll('.all-news--filter-btn'));
	const allItems = Array.from(section.querySelectorAll('.all-news--item'));
	const moreBtn = section.querySelector('.all-news--more-btn');
	const counterEl = section.querySelector('.all-news--counter');
	const footer = section.querySelector('.all-news--footer');

	if (allItems.length === 0) return;

	const getStep = () => {
		if (window.innerWidth < 768) return 5; // 1 колонка
		if (window.innerWidth < 992) return 6; // 2 колонки
		return 9; // 3 колонки
	};

	let activeCategory = 'all';
	let visibleCount = getStep();

	const renderNews = () => {
		const filteredItems = activeCategory === 'all'
			? allItems
			: allItems.filter((item) => item.dataset.category === activeCategory);

		const totalInCategory = filteredItems.length;
		const currentShown = Math.min(visibleCount, totalInCategory);

		// Спочатку ховаємо всі елементи
		allItems.forEach((item) => item.classList.add('is-hidden'));

		// Показуємо лише потрібну кількість відфільтрованих
		filteredItems.slice(0, currentShown).forEach((item) => {
			item.classList.remove('is-hidden');
		});

		if (counterEl) {
			counterEl.textContent = `Показано ${currentShown} з ${totalInCategory}`;
		}

		if (moreBtn) {
			moreBtn.style.display = currentShown >= totalInCategory ? 'none' : '';
		}

		if (footer) {
			footer.style.display = totalInCategory === 0 ? 'none' : '';
		}
	};

	// Перемикання категорій
	filterBtns.forEach((btn) => {
		btn.addEventListener('click', () => {
			if (btn.classList.contains('active')) return;

			filterBtns.forEach((b) => b.classList.remove('active'));
			btn.classList.add('active');

			activeCategory = btn.dataset.category || 'all';
			visibleCount = getStep();
			renderNews();
		});
	});

	// Кнопка "Показати більше"
	if (moreBtn) {
		moreBtn.addEventListener('click', () => {
			visibleCount += getStep();
			renderNews();
		});
	}

	renderNews();
});