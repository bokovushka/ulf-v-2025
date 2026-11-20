document.addEventListener('DOMContentLoaded', function () {
	const step1 = document.getElementById('esg-step-1');
	const step2 = document.getElementById('esg-step-2');
	const modalTitle = document.getElementById('esg-modal-title');

	const btnNext = document.getElementById('btn-esg-next');
	const btnPrev = document.getElementById('btn-esg-prev');

	const anonCheckbox = document.getElementById('esg-anonymous');
	const personalFields = document.getElementById('esg-personal-fields');
	const personalInputs = personalFields.querySelectorAll('input, select');

	// Перехід на Крок 2
	btnNext.addEventListener('click', function () {
		step1.classList.add('d-none');
		step2.classList.remove('d-none');
		modalTitle.classList.add('d-none'); // На 2-му кроці в макеті заголовок зверху прихований
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
				if (input.tagName === 'INPUT') input.value = '';
			});
		} else {
			personalFields.classList.remove('is-anonymous');
			personalInputs.forEach(input => {
				input.disabled = false;
			});
		}
	});

	// Обробка відправки форми
	const form = document.getElementById('form-popup-esg');
	form.addEventListener('submit', function (e) {
		e.preventDefault();
		// Тут твоя логіка AJAX-відправки та відкриття #popup-any-questions-thank-you
		$('#popup-esg').modal('hide');
		$('#popup-any-questions-thank-you').modal('show');
	});
});