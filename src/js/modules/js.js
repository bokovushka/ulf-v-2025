function setHeroHeight() {
	const h = window.innerHeight;
	document.documentElement.style.setProperty('--hero-height', `${h}px`);
}

window.addEventListener('resize', setHeroHeight);
window.addEventListener('orientationchange', setHeroHeight);
setHeroHeight();
