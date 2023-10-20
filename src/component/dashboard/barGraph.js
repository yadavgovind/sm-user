import { Bar } from "react-chartjs-2";
import { BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Title, Tooltip } from "chart.js";


ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);


// backgroundColor: [
// 	"rgba(255, 99, 132, 0.2)",
// ],
// 	borderColor: [
// 		"rgba(255, 99, 132, 1)",
// 	],
// 		borderWidth: 1
export default function barGraph({ customers }) {
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
	const label = customers?.map(item => item.customerName)
	const averageRate = customers?.map(item => item.averageValueOfProduct)
	const data = {
		labels: [...label],
		datasets: [
			{
				label: "Average Value of Product",
				data: [...averageRate],
				backgroundColor: "rgb(68, 119, 197)",
			}

		],

	};
	return (
		<div className="chart-container" style={{ position: 'relative', height: '40vh', width: '80vw' }}>
			<Bar options={option} data={data}

			/>
		</div>
	);
}