// Imports
const { SerialPort } = require('serialport')
const { Chart } = require('chart.js/auto')
import { Graph } from './classes/Graph.class.mjs'
import { Modal } from './classes/Modal.class.mjs'

// Config file (TODO: check if not exist)
const { graphs, options } = require('../config.json')

// Constants for most-used elements
const portStat = document.getElementById('portstat')
const pauseStat = document.getElementById('pausestat')
const root = document.getElementById('grid')
const pauseModal = document.getElementById('pausemodal')
const configModal = document.getElementById('configmodal')
const pauseButton = document.getElementById('startstoptoggle')
const serPortConnButton = document.getElementById('sptcon')
const serPortConnButtonText = document.getElementById('sptcont')
const configButton = document.getElementById('config')

// Config elements
const cfgInputFormatField = document.getElementById('inputFormatRaw')
const cfgSerialPortField = document.getElementById('serialPort')
const cfgSerialPortBaudField = document.getElementById('serialPortBaudrate')
const cfgSerialPortParityField = document.getElementById('serialPortParity')
const cfgSerialPortStopBitField = document.getElementById('serialPortStopBits')

//TODO: graph management

// Chart.js defaults
Chart.defaults.color = "#FFF"

// Flags
var paused = false					// Self explanatory
var portStatus = 0					// 0: disconnected, 1: connecting, 2: connected

// Global variables
var graphObjs = []					// Loaded graphs
var port = undefined				// Serial port
var dataBuffer = []					// Data in our "buffer"

//TODO: add data input things so we can see older data, add data saving system

// Button event listeners
pauseButton.addEventListener('click', (event) => { //Pause button
	event.preventDefault()
	pauseUnpause()
})

serPortConnButton.addEventListener('click', (event) => { //Connect/disconnect button
	event.preventDefault()

	if(portStatus === 2) { //Aka, connected
		closeSerial()
	} else if(portStatus !== 1){ //Disconnected
		initSerial()
	} //Don't do anything if portStatus is 1 (connecting)
})

configButton.addEventListener('click', (event) => {
	event.preventDefault()

	configModal.style.visibility = "visible"
})

// Function initializes the serial port and its callbacks
export function initSerial() {
	port = undefined
	portStatus = 1
	portStat.innerText = "CONNECTING..."
	serPortConnButtonText.innerText = "Connecting..." //TODO: put status colors on this button
	serPortConnButton.classList.add('working')
	port = new SerialPort(options.serial, 
		(err) => {
		if(err) {
			createModal('Port open error', err.message, 'generic', 'error')
			serPortConnButtonText.innerText = "Connect"
			portStat.innerText = "DISCONNECTED"
			portStatus = 0
		} else {
			portStat.innerText = "CONNECTED"
			serPortConnButton.classList.add('active')
			createModal('Serial port open', `Opened port '${options.port}'`, 'generic', 'success')
			serPortConnButtonText.innerText = "Disconnect"
			portStatus = 2
		}
		serPortConnButton.classList.remove('working')
	})

	port.on('data', (data) => {
		if(!paused) {
			//console.log(data)
			for(const value of data.values()) {
				if (value >= 128) break // Ignore unicode and EAscii characters
				dataBuffer.push(String.fromCharCode(value))
			}
		}
	})
}

export function closeSerial() {
	port.close()
	port = undefined

	portStatus = 0

	portStat.innerText = "DISCONNECTED"
	serPortConnButtonText.innerText = "Connect"

	serPortConnButton.classList.remove('active')

	createModal('Port disconnected', 'Successfully disconnected radio module', 'generic', 'info')
}

// Pause management
export function pauseUnpause() {
	paused = !paused

	if (paused) {
		pauseButton.classList.remove('active')
		pauseModal.style.visibility = 'visible'
	} else {
		pauseButton.classList.add('active')
		pauseModal.style.visibility = 'hidden'
	}
}

// Function generates graphs from the config file
function generateGraphs() {
	for (var x in graphs) {
		//Generate graph info
		var graph = new Graph(graphs[x])

		//Create the element and add it to the graph div
		var t = document.createElement('div')
		t.classList.add('griditem')
		t.innerHTML = graph.getDOMelement()
		root.appendChild(t)

		//Now create the graph context
		var canvas = document.getElementById(graph.id)
		var chart = new Chart(canvas, graph.getGraphObject())

		var object = {
			graph: chart,
			id: graph.id
		}

		graphObjs.push(object)
	}
}

// Function to create popups (message popups)
function createModal(title, message, type='generic', status="default") {
	/*
	Title: the title of the modal
	Message: the message that the modal contains
	Type: the type of modal. Generic is a bottom left popup, center-noclose is a
		centered modal with no close button, center is a center popup modal.
	Status: the color of the modal. default: gray, info: blue, warning: yellow, error: red
	*/

	//Create the object
	var modal = new Modal({
		type: type,
		status: status,
		message,
		title
	})

	// Create a new div element and set it's properties
	var t = document.createElement("div")

	var divClass = type === 'generic' ? 'modal' : type

	t.classList.add(divClass, status)
	t.innerHTML = modal.getDOMelement()
	t.id = modal.id

	// Now add it to `body`
	document.body.appendChild(t)
}

// Call graph generator and initialize serial port
serPortConnButtonText.innerText = "Connect"
initSerial()
generateGraphs()

// Update config modal
if (options) {
	cfgInputFormatField.value = options.dataScheme
	cfgSerialPortField.value = options.serial.path
	cfgSerialPortBaudField.value = options.serial.baudRate
	cfgSerialPortParityField.value = options.serial.parity
	cfgSerialPortStopBitField.value = options.serial.stopBits
}

if (!paused) {
	pauseModal.style.visibility = 'hidden'
	pauseButton.classList.add('active')
}

// Start the graph update system, update every 100 ms
setInterval(() => {

	//TODO: make it so it can use config

	var newData = []
	var useNewData = false
	var foundEnd = false

	var indexStr = ""
	for (var x in dataBuffer) {
		var c = dataBuffer[x]
		if(c == "\n") {
			console.info("Found end of data string")
			foundEnd = true
			break
		}
		indexStr += c
	}
	//Don't do anything if no newline character was found
	if(foundEnd) {
		dataBuffer = [] //Clear the buffer

		newData = indexStr.split(',')

		if(newData.length === 7) {
			useNewData = true
			console.info("VALID DATA: " + indexStr)
		} else {
			console.warn("INVALID DATA: " + indexStr)
		}

	}

	for(var x in graphObjs) {
		// Prevent graphs from updating if the system is paused
		if(!paused) {
			var g = graphObjs[x]
			
			if (useNewData) g.data.datasets[0].graph.data.push(newData[x])

			g.update()
		}
	}
}, 25)

// Clear buffer every second
// setInterval(() => {
// 	dataBuffer = []
// }, 1000)

/*
To do list

- Serial port updating
- Config modal
*/
