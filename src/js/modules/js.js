function setHeroHeight() {
	const h = window.innerHeight;
	document.documentElement.style.setProperty('--hero-height', `${h}px`);
}

// Ставимо один раз при завантаженні
setHeroHeight();

// Оновлюємо тільки при зміні орієнтації
window.addEventListener('orientationchange', setHeroHeight);