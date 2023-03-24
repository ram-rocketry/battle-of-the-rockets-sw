/*
RamRocketry Ground Station

This file creates the electron contexts and window.
*/

const {app, BrowserWindow} = require('electron')

// Create the window
function createWindow() {
	var win = new BrowserWindow({
		width: 1600,
		height: 900,
		webPreferences: {
			nodeIntegration: true,
			contextIsolation:false
		}
	})

	//Maximize
	win.maximize()

	//Load the frontend
	win.loadFile('./src/index.html')
}

app.whenReady().then(() => {
	createWindow()

	app.on('activate', () => {
		if(BrowserWindow.getAllWindows().length === 0) createWindow()
	})
})

app.on('window-all-closed', () => {
	if(process.platform !== 'darwin') app.quit()
})