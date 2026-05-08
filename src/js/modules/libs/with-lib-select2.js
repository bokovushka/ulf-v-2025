import $ from 'jquery';
import "../../../../node_modules/select2/dist/js/select2.js";

//? select
$(document).ready(function () {
	$('.field .select-wrap select').select2({
		minimumResultsForSearch: -1,
	});
});


//header
$(document).ready(function () {
	$('.header-select-city').select2({
		minimumResultsForSearch: -1,
		dropdownParent: $('#header-select-city')
	});
});

$(document).ready(function () {
	$('.header-mob-select-city').select2({
		minimumResultsForSearch: -1,
		dropdownParent: $('#header-mob-select-city')
	});
});

$(document).ready(function () {
	$('.footer-select-city').select2({
		minimumResultsForSearch: -1,
		dropdownParent: $('#footer-select-city')
	});
});

$(document).ready(function () {

	if (window.innerWidth < 1024) {
		$('.select-sort-to option:first').text('Усі авто');
		$('.select-sort-to--city option:first').text('Усі міста');
	}

	$('.select-sort-to').select2({
		minimumResultsForSearch: -1,
		dropdownParent: $('.our-fleet .sort-to'),
	});

	$('.select-sort-to--city').select2({
		minimumResultsForSearch: -1,
		dropdownParent: $('.our-fleet .sort-to--city'),
	});

});

$(document).ready(function () {
	$('.select-months-value').select2({
		minimumResultsForSearch: -1,
		dropdownParent: $('.gallery-car .select-months--wrap')
	});
});
