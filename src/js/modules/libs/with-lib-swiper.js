import Swiper from 'swiper/bundle';

//? articles-preview--swiper
new Swiper('.last-ship-preview--swiper', {
	slidesPerView: 4,
	spaceBetween: 20,
	loop: true,
	// autoplay: {
	// 	delay: 5000,
	// 	disableOnInteraction: false,
	// },
	speed: 800,
	grabCursor: true,
	navigation: {
		nextEl: ".last-ship-preview .swiper-buttons .button-slider-next",
		prevEl: ".last-ship-preview .swiper-buttons .button-slider-prev",
	},
	breakpoints: {
		1200: {
		},
		1024: {
			slidesPerView: 3,
		},
		640: {
			slidesPerView: 2,
		},
		0: {
			slidesPerView: 1,
		}
	},
});

new Swiper('.nav-pills--swiper', {
	slidesPerView: "auto",
	spaceBetween: 20,
	speed: 800,
	grabCursor: true,
	freeMode: true,
});


//? benefits-leasing--swiper
new Swiper('.benefits-leasing--swiper', {

	loop: true,
	// autoplay: {
	// 	delay: 5000,
	// 	disableOnInteraction: false,
	// },
	speed: 800,
	grabCursor: true,
	navigation: {
		nextEl: ".benefits-leasing .swiper-buttons .button-slider-next",
		prevEl: ".benefits-leasing .swiper-buttons .button-slider-prev",
	},
	pagination: {
		el: ".benefits-leasing .swiper-pagination",
		clickable: true,
	},
	breakpoints: {
		768: {
			slidesPerView: 1,
			spaceBetween: 32,
			grid: {
				rows: 4,
				fill: "row",
			},
		},
		0: {
			slidesPerView: 1,
			autoHeight: true,
		}
	},
});

// images
const swiperImages = new Swiper('.benefits-partners--swiper', {
	slidesPerView: 1,
	spaceBetween: 32,
	speed: 800,
	grabCursor: true,
	breakpoints: {
		768: {

		},
		0: {
			slidesPerView: 1.2,
			spaceBetween: 16,
		}
	},
	navigation: {
		nextEl: ".benefits-partners .swiper-buttons .button-slider-next",
		prevEl: ".benefits-partners .swiper-buttons .button-slider-prev",
	},
	pagination: {
		el: ".benefits-partners .swiper-pagination",
		clickable: true,
	},
});

// categories
const swiperCategories = new Swiper('.benefits-partners-categorie--swiper', {
	slidesPerView: 1,
	spaceBetween: 32,
	grid: {
		rows: 3,
		fill: "row",
	},
	speed: 800,
	grabCursor: true,
	breakpoints: {
		768: {

		},
		0: {
			slidesPerView: 1,
			grid: {
				rows: 1,
				fill: "row",
			},
		}
	},
	allowTouchMove: false, // блокуємо свайп по заголовках
});

// descriptions
const swiperDescriptions = new Swiper('.benefits-partners-description--swiper', {
	slidesPerView: 1,
	spaceBetween: 32,
	speed: 800,
	grabCursor: true,
	autoHeight: true,
	breakpoints: {
		768: {

		},
		0: {
			slidesPerView: 1,
		}
	},
	effect: 'fade',
	fadeEffect: {
		crossFade: true,
	},
});

if (window.matchMedia('(min-width: 768px)').matches) {
	// ---- синхронізація ----
	function syncAll(index) {
		swiperImages.slideTo(index);
		swiperDescriptions.slideTo(index);

		// підсвічування активного заголовка
		const catSlides = document.querySelectorAll('.benefits-partners-categorie--swiper .swiper-slide');
		catSlides.forEach((slide, idx) => {
			slide.classList.toggle('swiper-slide-active', idx === index);
		});
	}

	// кліки по заголовках (grid слайди)
	document.querySelectorAll('.benefits-partners-categorie--swiper .swiper-slide').forEach((slide, idx) => {
		slide.addEventListener('click', () => syncAll(idx));
	});

	// свайп картинок чи опису теж синхронізує заголовки
	swiperImages.on('slideChange', () => syncAll(swiperImages.activeIndex));
	swiperDescriptions.on('slideChange', () => syncAll(swiperDescriptions.activeIndex));
};


//? popular-brands--swiper
new Swiper('.popular-brands--swiper', {
	slidesPerView: 2.5,
	spaceBetween: 20,
	loop: true,
	// autoplay: {
	// 	delay: 5000,
	// 	disableOnInteraction: false,
	// },
	speed: 800,
	grabCursor: true,
	navigation: {
		nextEl: ".popular-brands .swiper-buttons .button-slider-next",
		prevEl: ".popular-brands .swiper-buttons .button-slider-prev",
	},
	breakpoints: {
		1200: {
		},
		1024: {
			slidesPerView: 1.8,
		},
		768: {
			slidesPerView: 1.4,
		},
		0: {
			slidesPerView: 1.2,
			spaceBetween: 12,
		}
	},
});


//? popular-brands--swiper
new Swiper('.our-partners--swiper', {
	slidesPerView: 5.5,
	spaceBetween: 20,
	loop: true,
	// autoplay: {
	// 	delay: 5000,
	// 	disableOnInteraction: false,
	// },
	speed: 800,
	grabCursor: true,
	navigation: {
		nextEl: ".our-partners .swiper-buttons .button-slider-next",
		prevEl: ".our-partners .swiper-buttons .button-slider-prev",
	},
	breakpoints: {
		1200: {
		},
		1024: {
			slidesPerView: 4.5,
		},
		768: {
			slidesPerView: 3.5,
		},
		0: {
			slidesPerView: 2.2,
			spaceBetween: 12,
		}
	},
});



//? popular-brands--swiper
new Swiper('.our-partners--swiper', {
	slidesPerView: 5.5,
	spaceBetween: 20,
	loop: true,
	// autoplay: {
	// 	delay: 5000,
	// 	disableOnInteraction: false,
	// },
	speed: 800,
	grabCursor: true,
	navigation: {
		nextEl: ".our-partners .swiper-buttons .button-slider-next",
		prevEl: ".our-partners .swiper-buttons .button-slider-prev",
	},
	breakpoints: {
		1200: {
		},
		1024: {
			slidesPerView: 4.5,
		},
		768: {
			slidesPerView: 3.5,
		},
		0: {
			slidesPerView: 2.2,
			spaceBetween: 12,
		}
	},
});


new Swiper('.news--swiper', {
	slidesPerView: 3,
	spaceBetween: 20,
	loop: true,
	// autoplay: {
	// 	delay: 5000,
	// 	disableOnInteraction: false,
	// },
	speed: 800,
	grabCursor: true,
	breakpoints: {
		1200: {
		},
		1024: {
			slidesPerView: 3,
		},
		768: {
			slidesPerView: 1.7,
		},
		0: {
			slidesPerView: 1.2,
			spaceBetween: 12,
		}
	},
});

//.hero--swiper
new Swiper('.hero--swiper', {
	slidesPerView: 1,
	spaceBetween: 20,
	loop: true,
	// autoplay: {
	// 	delay: 5000,
	// 	disableOnInteraction: false,
	// },
	speed: 800,
	grabCursor: true,
	navigation: {
		nextEl: ".section-hero .swiper-buttons .button-slider-next",
		prevEl: ".section-hero .swiper-buttons .button-slider-prev",
	},
	pagination: {
		el: ".section-hero .swiper-pagination",
		clickable: true,
	},
});