document.addEventListener('DOMContentLoaded', function () {
	const form = document.getElementById('form-popup-esg');
	const step1 = document.getElementById('esg-step-1');
	const step2 = document.getElementById('esg-step-2');
	const modalTitle = document.getElementById('esg-modal-title');

	const btnNext = document.getElementById('btn-esg-next');
	const btnPrev = document.getElementById('btn-esg-prev');

	const anonCheckbox = document.getElementById('esg-anonymous');
	const personalFields = document.getElementById('esg-personal-fields');
	const personalInputs = personalFields.querySelectorAll('input');

	// Перехід на Крок 2
	btnNext.addEventListener('click', function () {
		step1.classList.add('d-none');
		step2.classList.remove('d-none');
		modalTitle.classList.add('d-none');
	});

	// Повернення на Крок 1
	btnPrev.addEventListener('click', function () {
		step2.classList.add('d-none');
		step1.classList.remove('d-none');
		modalTitle.classList.remove('d-none');
	});

	// Логіка чекбокса "Анонімне звернення"
	anonCheckbox.addEventListener('change', function () {
		if (this.checked) {
			personalFields.classList.add('is-anonymous');
			personalInputs.forEach(input => {
				input.disabled = true;
				input.value = '';
			});
		} else {
			personalFields.classList.remove('is-anonymous');
			personalInputs.forEach(input => {
				input.disabled = false;
			});
		}
	});

	// Скидання форми на 1-й крок після закриття попапа
	if (typeof $ !== 'undefined') {
		$('#popup-esg').on('hidden.bs.modal', function () {
			form.reset();
			step2.classList.add('d-none');
			step1.classList.remove('d-none');
			modalTitle.classList.remove('d-none');
			personalFields.classList.remove('is-anonymous');
			personalInputs.forEach(input => input.disabled = false);
		});
	}
});


document.addEventListener('DOMContentLoaded', function () {
	const incidentForm = document.getElementById('form-popup-incident');
	const incidentStep1 = document.getElementById('incident-step-1');
	const incidentStep2 = document.getElementById('incident-step-2');

	const btnIncidentNext = document.getElementById('btn-incident-next');
	const btnIncidentPrev = document.getElementById('btn-incident-prev');

	if (btnIncidentNext && btnIncidentPrev) {
		// Перехід на Крок 2
		btnIncidentNext.addEventListener('click', function () {
			incidentStep1.classList.add('d-none');
			incidentStep2.classList.remove('d-none');
		});

		// Повернення на Крок 1
		btnIncidentPrev.addEventListener('click', function () {
			incidentStep2.classList.add('d-none');
			incidentStep1.classList.remove('d-none');
		});
	}

	// Скидання форми на 1-й крок після закриття попапа
	if (typeof $ !== 'undefined') {
		$('#popup-incident').on('hidden.bs.modal', function () {
			if (incidentForm) incidentForm.reset();
			incidentStep2.classList.add('d-none');
			incidentStep1.classList.remove('d-none');
		});
	}
});