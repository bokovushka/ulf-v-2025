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
