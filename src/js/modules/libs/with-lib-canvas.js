import CanvasJS from '@canvasjs/charts';

function createRiskChart() {
	const chartContainer = document.getElementById("riskChart");
	if (!chartContainer) return;

	const dataPoints = [
		{ x: 0, y: 1.2, color: "#388E53" },
		{ x: 1, y: 2.1, color: "#0084E8" },
		{ x: 2, y: 3.05, color: "#ED8936" },
		{ x: 3, y: 4, color: "#E54848" } // дорівнює axisY.maximum
	];

	const riskChart = new CanvasJS.Chart("riskChart", {
		backgroundColor: "transparent",
		animationEnabled: true,
		toolTip: { enabled: false },
		exportEnabled: false,
		axisX: {
			minimum: -0.5,
			maximum: 3.5,
			lineThickness: 0,
			tickLength: 0,
			gridThickness: 0,
			labelFormatter: () => ""
		},
		axisY: {
			minimum: 0,
			maximum: 4,
			lineThickness: 0,
			tickLength: 0,
			gridThickness: 0,
			labelFormatter: () => ""
		},
		data: [{
			type: "column",
			dataPoints: dataPoints
		}]
	});

	function adjustColumnWidth() {
		// Беремо ширину внутрішнього plotArea (приблизно ширина контейнера мінус 20px службових полів CanvasJS)
		const plotWidth = chartContainer.offsetWidth - 20;
		if (plotWidth > 0) {
			riskChart.options.dataPointWidth = Math.ceil(plotWidth / dataPoints.length);
		}
	}

	adjustColumnWidth();
	riskChart.render();

	window.addEventListener("resize", () => {
		adjustColumnWidth();
		riskChart.render();
	});
}

document.addEventListener("DOMContentLoaded", createRiskChart);