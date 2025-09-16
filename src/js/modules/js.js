function setHeroHeight() {
	const h = window.innerHeight;
	document.documentElement.style.setProperty('--hero-height', `${h}px`);
}

setHeroHeight();

window.addEventListener('orientationchange', () => {
	setHeroHeight();
	window.addEventListener('resize', setHeroHeight, { once: true });
});
