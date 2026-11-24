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

		const stopBoundary = getOffsetTop(parent) + parent.offsetHeight - paddingBottom;
		const bottomGap = 0;

		const stopPoint = Math.max(0, stopBoundary - parentTop - blockHeight - bottomGap);
		const stopScrollTop = parentTop + stopPoint - stickyTop;

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
			if (window.innerWidth <= 1023) return;
			let start = null;
			const step = (timestamp) => {
				if (!start) start = timestamp;
				updatePosition();
				if (timestamp - start < 620) {
					requestAnimationFrame(step);
				}
			};
			requestAnimationFrame(step);
		});

		observer.observe(headerTop, { attributes: true, attributeFilter: ['class'] });
	}

	updatePosition();
}

function mobileStickyMove(stickyBlock) {
	if (!stickyBlock || !document.body.classList.contains('esg')) return;

	const parent = stickyBlock.parentElement;
	const contentBlock = parent.nextElementSibling;
	const header = document.querySelector('.header');
	const footer = document.querySelector('footer, .footer');

	const getScrollTop = () => window.scrollY || document.documentElement.scrollTop || document.body.scrollTop || 0;
	const getOffsetTop = (el) => el.getBoundingClientRect().top + getScrollTop();

	let anchorScroll = getScrollTop();
	let isHeaderHidden = false;
	let isInitialized = false;

	const setHeaderTransform = (hidden, instant = false) => {
		if (!header) return;
		if (instant) {
			header.style.setProperty('transition', 'none', 'important');
		} else {
			header.style.setProperty('transition', 'transform 0.6s ease-out, background-color 0.6s ease', 'important');
		}
		header.style.transform = hidden ? 'translateY(-100%)' : 'translateY(0)';
	};

	const resetStyles = () => {
		stickyBlock.style.position = '';
		stickyBlock.style.top = '';
		stickyBlock.style.left = '';
		stickyBlock.style.width = '';
		stickyBlock.style.transform = '';
		stickyBlock.style.transition = '';
		parent.style.position = '';
		parent.style.minHeight = '';

		if (contentBlock) {
			contentBlock.style.transform = '';
			contentBlock.style.transition = '';
		}

		if (header) {
			header.style.transform = '';
			header.style.removeProperty('transition');
		}
		isHeaderHidden = false;
		isInitialized = false;
		anchorScroll = getScrollTop();
	};

	const updateMobile = (forceInstant = false) => {
		if (window.innerWidth > 1023) return;

		const instant = forceInstant === true || !isInitialized;
		const scrollTop = getScrollTop();
		const headerHeight = header ? header.offsetHeight : 0;
		const blockHeight = stickyBlock.offsetHeight;

		parent.style.position = 'relative';
		parent.style.minHeight = `${blockHeight}px`;

		const parentTop = getOffsetTop(parent);
		const section = parent.closest('section') || parent.parentElement;
		const stopBoundary = footer
			? getOffsetTop(footer)
			: (section ? getOffsetTop(section) + section.offsetHeight : document.documentElement.scrollHeight);

		const stopPoint = Math.max(0, stopBoundary - parentTop - blockHeight);
		const maxPageTop = parentTop + stopPoint;
		const footerLimitInViewport = maxPageTop - scrollTop;
		const isMenuOpen = header && header.classList.contains('menu-open');

		// 1. Напрямок скролу (при першому рендері/перезавантаженні синхронізуємо anchorScroll без хибного стрибка)
		if (!isInitialized) {
			anchorScroll = scrollTop;
			isHeaderHidden = false;
		} else if (scrollTop <= 10 || isMenuOpen) {
			isHeaderHidden = false;
			anchorScroll = scrollTop;
		} else {
			const delta = scrollTop - anchorScroll;
			if (!isHeaderHidden && delta > 10) {
				isHeaderHidden = true;
				anchorScroll = scrollTop;
			} else if (isHeaderHidden && delta < -15) {
				isHeaderHidden = false;
				anchorScroll = scrollTop;
			} else if ((isHeaderHidden && delta > 0) || (!isHeaderHidden && delta < 0)) {
				anchorScroll = scrollTop;
			}
		}

		if (!isMenuOpen && footerLimitInViewport < headerHeight) {
			isHeaderHidden = true;
		}

		const targetY = isHeaderHidden ? 0 : headerHeight;
		const isAtFooter = footerLimitInViewport <= targetY;

		setHeaderTransform(isHeaderHidden, instant);

		if (contentBlock) {
			contentBlock.style.transition = instant ? 'none' : 'transform 0.6s ease-out';
			const shiftY = (isHeaderHidden && !isAtFooter) ? -50 : 0;
			contentBlock.style.transform = `translateY(${shiftY}px)`;
		}

		const viewportWidth = document.documentElement.clientWidth;

		if (isAtFooter) {
			const parentLeft = parent.getBoundingClientRect().left;
			stickyBlock.style.transition = 'none';
			stickyBlock.style.position = 'absolute';
			stickyBlock.style.top = `${stopPoint}px`;
			stickyBlock.style.left = `${-parentLeft}px`;
			stickyBlock.style.width = `${viewportWidth}px`;
			stickyBlock.style.transform = 'translateY(0)';
		} else {
			const wasAbsolute = stickyBlock.style.position === 'absolute';

			stickyBlock.style.position = 'fixed';
			stickyBlock.style.top = '0px';
			stickyBlock.style.left = '0px';
			stickyBlock.style.width = `${viewportWidth}px`;

			if (instant || wasAbsolute) {
				stickyBlock.style.transition = 'none';
				stickyBlock.style.transform = `translateY(${targetY}px)`;
				void stickyBlock.offsetWidth;
				stickyBlock.style.transition = 'transform 0.6s ease-out';
			} else {
				stickyBlock.style.transition = 'transform 0.6s ease-out';
				stickyBlock.style.transform = `translateY(${targetY}px)`;
			}
		}

		isInitialized = true;
	};

	window.addEventListener('scroll', () => updateMobile(false), { passive: true });
	document.addEventListener('scroll', () => updateMobile(false), { passive: true });
	window.addEventListener('resize', () => {
		if (window.innerWidth > 1023) {
			resetStyles();
		} else {
			updateMobile(true);
		}
	});
	window.addEventListener('load', () => updateMobile(true));
	window.addEventListener('pageshow', () => updateMobile(true));

	if (header) {
		const observer = new MutationObserver(() => {
			if (window.innerWidth <= 1023) updateMobile(false);
		});
		observer.observe(header, { attributes: true, attributeFilter: ['class'] });
	}

	updateMobile(true);
}

document.addEventListener('DOMContentLoaded', () => {
	const sidebar = document.querySelector('.esg-sidebar');
	const footer = document.querySelector('footer, .footer');

	stickyMove(sidebar, footer);
	mobileStickyMove(sidebar);
});