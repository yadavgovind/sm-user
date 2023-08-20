import { Bar } from "react-chartjs-2";
import { BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Title, Tooltip } from "chart.js";


ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const option = {
	responsive: true,
	cutoutPercentage: 80,
	plugins: {
		legend: { position: "chartArea" },
		title: {
			display: true,
			text: "Top Customer",
		},
	},
};

const data = {
	labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
	datasets: [
		{
			label: "Customer",
			data: [20, 30, 40, 50, 60, 70],
			backgroundColor: "rgb(68, 119, 197)",
		}

	],

};
// backgroundColor: [
// 	"rgba(255, 99, 132, 0.2)",
// ],
// 	borderColor: [
// 		"rgba(255, 99, 132, 1)",
// 	],
// 		borderWidth: 1
export default function barGraph() {
	return (
		<div className="chart-container" style={{ position: 'relative', height: '40vh', width: '80vw' }}>
			<Bar options={option} data={data}

			/>
		</div>
	);
}