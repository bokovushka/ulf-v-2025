import CanvasJS from '@canvasjs/charts';

function createRiskChart() {
	const chartContainer = document.getElementById("riskChart");
	if (!chartContainer) return;

	const mobileQuery = window.matchMedia("(max-width: 1023.98px)");

	const desktopDataPoints = [
		{ x: 0, y: 1.2, color: "#388E53" },
		{ x: 1, y: 2.1, color: "#0084E8" },
		{ x: 2, y: 3.05, color: "#ED8936" },
		{ x: 3, y: 4, color: "#E54848" }
	];

	const mobileDataPoints = [
		{ x: 0, y: 1.45, color: "#388E53" },
		{ x: 1, y: 2.2, color: "#0084E8" },
		{ x: 2, y: 3.1, color: "#ED8936" },
		{ x: 3, y: 4, color: "#E54848" }
	];

	const getActiveDataPoints = (isMobile) => (isMobile ? mobileDataPoints : desktopDataPoints);

	const riskChart = new CanvasJS.Chart("riskChart", {
		backgroundColor: "transparent",
		animationEnabled: true,
		toolTip: { enabled: false },
		exportEnabled: false,
		axisX: {
			minimum: -0.5,
			maximum: 3.5,
			reversed: mobileQuery.matches,
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
			type: mobileQuery.matches ? "bar" : "column",
			dataPoints: getActiveDataPoints(mobileQuery.matches)
		}]
	});

	function updateChartLayout() {
		const isMobile = mobileQuery.matches;
		const activePoints = getActiveDataPoints(isMobile);

		riskChart.options.data[0].type = isMobile ? "bar" : "column";
		riskChart.options.data[0].dataPoints = activePoints;
		riskChart.options.axisX.reversed = isMobile;

		if (isMobile) {
			const plotHeight = chartContainer.offsetHeight - 20;
			if (plotHeight > 0) {
				riskChart.options.dataPointWidth = Math.ceil(plotHeight / activePoints.length);
			}
		} else {
			const plotWidth = chartContainer.offsetWidth - 20;
			if (plotWidth > 0) {
				riskChart.options.dataPointWidth = Math.ceil(plotWidth / activePoints.length);
			}
		}

		riskChart.render();
	}

	updateChartLayout();
	window.addEventListener("resize", updateChartLayout);
}

document.addEventListener("DOMContentLoaded", createRiskChart);