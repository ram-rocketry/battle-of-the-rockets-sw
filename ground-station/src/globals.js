import { SerialPort } from "serialport";

let serialPort

function init() {

	serialPort = new SerialPort({
		path: "COM4",
		baudRate: 57600
	})

	serialPort.on("data", (data) => {

	})
}