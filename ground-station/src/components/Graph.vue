<template>
	<div class="graphBg">
		<h4>{{ this.title }}</h4>
		<canvas ref="canvas"></canvas>
	</div>
</template>

<script>
import {Chart, registerables} from "chart.js"
import { shallowRef } from "vue"

export default {
	name: "Graph",
	props: {
		units: {
			type: String,
			default: ""
		},
		title: {
			type: String,
			required: true
		},
		datasetLabel: {
			type: String,
			required: true
		}

	},
	data() {
		return {
			chart: null,
			labels: []
		}
	},
	mounted() {
		Chart.register(...registerables)
		Chart.defaults.color = "#fff"

		this.chart = shallowRef(new Chart(this.$refs.canvas, {
			type: "line",
			data: {
				labels: [],
				datasets: [{
					data: [],
					label: this.datasetLabel,
					borderColor: '#ffcc00',
					backgroundColor: '#775500',
				}]
			},
			options: {
				animation: false,
				scales: {
					yAxes: {
						max: 100,
						min: 0,
						ticks: {
							beginAtZero: true
						}
					}
				},
				elements: {
					point: {
						radius: 0
					}
				},
				// layout: {
				// 	padding: {
				// 		right: 20
				// 	}
				// }
			}
		}))

		var xc = -20

		while (xc < 0) {
			this.chart.data.labels.push(xc)
			this.chart.data.datasets[0].data.push(null)
			xc++
		}

		//Test updating
		setInterval(() => {
			var value = Math.floor(Math.random() * 100)

			this.chart.data.datasets[0].data.shift()
			this.chart.data.datasets[0].data.push(value)

			this.chart.update()
		}, 500)
	},
	watch() {
		data
	}
}
</script>

<style scoped>

div.graphBg {
	background-color: #555;
	border: 1px solid white;
	border-radius: 5px;
	padding: 5px;
	text-align: center;
}

</style>