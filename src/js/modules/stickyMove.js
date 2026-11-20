function stickyMove(stickyBlock, downBlockMove) {
	if (!stickyBlock || !downBlockMove) return;

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
		if (window.innerWidth <= 992) {
			stickyBlock.classList.remove('fixed', 'is-smooth');
			stickyBlock.style.position = '';
			stickyBlock.style.top = '';
			stickyBlock.style.left = '';
			stickyBlock.style.width = '';
			parent.style.minHeight = '';
			return;
		}

		parent.style.position = 'relative';
		parent.style.minHeight = `${stickyBlock.offsetHeight}px`;

		const scrollTop = window.scrollY;
		const headerBottom = getVisibleHeaderBottom();
		const stickyTop = headerBottom + 60; // єдина точка відступу від верху екрана
		const parentTop = getOffsetTop(parent);
		const stopBoundary = getOffsetTop(downBlockMove);
		const blockHeight = stickyBlock.offsetHeight;

		const parentStyle = getComputedStyle(parent);
		const parentInnerWidth = parent.clientWidth - parseFloat(parentStyle.paddingLeft) - parseFloat(parentStyle.paddingRight);

		const bottomGap = 96;
		const stopScrollTop = stopBoundary - blockHeight - stickyTop - bottomGap;
		const stopPoint = stopScrollTop - parentTop + stickyTop;

		// Старт фіксації рівно в момент, коли parentTop доходить до stickyTop (без стрибка на 20px)
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
				stickyBlock.style.left = parentStyle.paddingLeft;
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
}

document.addEventListener('DOMContentLoaded', () => {
	const sidebar = document.querySelector('.esg-sidebar');
	const footer = document.querySelector('footer, .footer');

	stickyMove(sidebar, footer);
});