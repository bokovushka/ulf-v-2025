function stickyMove(stickyBlock, downBlockMove) {
	if (!stickyBlock) return;

	const parent = stickyBlock.parentElement;
	const headerMain = document.querySelector('.header-main');
	const headerTop = document.querySelector('.header-top');

	const getOffsetTop = (el) => el.getBoundingClientRect().top + window.scrollY;

	const getVisibleHeaderBottom = () => {
		let bottom = 0;

		if (headerMain) {
			const rect = headerMain.getBoundingClientRect();
			if (rect.bottom > bottom) bottom = rect.bottom;
		}

		if (headerTop && headerTop.classList.contains('header--show')) {
			const rect = headerTop.getBoundingClientRect();
			if (rect.bottom > bottom) bottom = rect.bottom;
		}

		return Math.max(0, Math.round(bottom));
	};

	const updatePosition = () => {
		if (window.innerWidth <= 1023) {
			stickyBlock.classList.remove('fixed', 'is-smooth');
			stickyBlock.style.position = '';
			stickyBlock.style.top = '';
			stickyBlock.style.left = '';
			stickyBlock.style.width = '';
			parent.style.minHeight = '';
			return;
		}

		const blockHeight = stickyBlock.getBoundingClientRect().height;
		parent.style.position = 'relative';
		parent.style.minHeight = `${blockHeight}px`;

		const scrollTop = window.scrollY;
		const headerBottom = getVisibleHeaderBottom();
		const stickyTop = headerBottom + 60;
		const parentTop = getOffsetTop(parent);

		const parentStyle = getComputedStyle(parent);
		const paddingLeft = parseFloat(parentStyle.paddingLeft) || 0;
		const paddingRight = parseFloat(parentStyle.paddingRight) || 0;
		const paddingBottom = parseFloat(parentStyle.paddingBottom) || 0;
		const parentInnerWidth = parent.clientWidth - paddingLeft - paddingRight;

		// Орієнтуємося на нижній край батьківської сітки (щоб блок зупинявся врівень із правою колонкою).
		// Якщо parent розтягнутий по висоті сусідньої колонки, це спрацює ідеально.
		// Якщо ж потрібна прив'язка саме до downBlockMove (футера) — розкоментуйте рядок нижче:
		const stopBoundary = getOffsetTop(parent) + parent.offsetHeight - paddingBottom;
		const bottomGap = 0;

		// Альтернатива з прив'язкою до футера (якщо parent не має висоти сусідньої колонки):
		// const stopBoundary = downBlockMove ? getOffsetTop(downBlockMove) : (getOffsetTop(parent) + parent.offsetHeight - paddingBottom);
		// const bottomGap = 180; // збільшуйте або зменшуйте це число для точного підгону до футера

		const stopScrollTop = stopBoundary - blockHeight - stickyTop - bottomGap;
		const stopPoint = stopScrollTop - parentTop + stickyTop;

		if (scrollTop > 0 && scrollTop + stickyTop >= parentTop) {
			if (scrollTop < stopScrollTop) {
				const wasFixed = stickyBlock.classList.contains('fixed');

				stickyBlock.classList.add('fixed');
				stickyBlock.style.position = 'fixed';
				stickyBlock.style.top = `${stickyTop}px`;
				stickyBlock.style.left = '';
				stickyBlock.style.width = `${parentInnerWidth}px`;

				if (wasFixed) {
					stickyBlock.classList.add('is-smooth');
				}
			} else {
				stickyBlock.classList.remove('fixed', 'is-smooth');
				stickyBlock.style.position = 'absolute';
				stickyBlock.style.top = `${stopPoint}px`;
				stickyBlock.style.left = `${paddingLeft}px`;
				stickyBlock.style.width = `${parentInnerWidth}px`;
			}
		} else {
			stickyBlock.classList.remove('fixed', 'is-smooth');
			stickyBlock.style.position = '';
			stickyBlock.style.top = '';
			stickyBlock.style.left = '';
			stickyBlock.style.width = '';
		}
	};

	window.addEventListener('scroll', updatePosition, { passive: true });
	window.addEventListener('resize', updatePosition);
	window.addEventListener('load', updatePosition);

	if (headerTop) {
		const observer = new MutationObserver(() => {
			let start = null;
			const step = (timestamp) => {
				if (!start) start = timestamp;
				updatePosition();
				if (timestamp - start < 350) {
					requestAnimationFrame(step);
				}
			};
			requestAnimationFrame(step);
		});

		observer.observe(headerTop, { attributes: true, attributeFilter: ['class'] });
	}

	updatePosition();
}

document.addEventListener('DOMContentLoaded', () => {
	const sidebar = document.querySelector('.esg-sidebar');
	const footer = document.querySelector('footer, .footer');

	stickyMove(sidebar, footer);
});