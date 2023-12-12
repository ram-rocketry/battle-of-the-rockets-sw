/*
RamRocketry Ground Station - Graph class

Generates graph information and DOMelement
*/
class Graph {
	constructor(options) {
		this.id = options.id
		
		this.data = {
			labels: [], //TODO: make this somewhat dynamic
			datasets: [
				{
					label: options.yLabel,
					data: []
				}
			]
		}

		this.options = {
			responsive: true,
			animation: false,
			aspectRatio: 1.5,
			plugins: {
				title: {
					display: true,
					text: options.title
				}
			},
			scales: {
				y: {
					beginAtZero: true,
					ticks: {
						callback: (value, _index, _ticks) => {
							return value + options.units
						}
					}
				}
			}
		}

		this.graphObject = {
			type: 'line',
			data: this.data,
			options: this.options
		}
	}
	getDOMelement() {
		return `<canvas id="${this.id}"></canvas>`
	}
	getGraphObject() {
		return this.graphObject
	}
	updateData(newData) {
		this.data = newData
	}
	getData() {
		return this.data
	}
}

export {Graph}