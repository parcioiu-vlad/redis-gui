const {app, BrowserWindow } = require('electron')
const path = require('path')
const url = require('url')

const ipc = require('electron').ipcMain
let redis = require('redis');
let client = null;
// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win

function createWindow () {
  // Create the browser window.
  win = new BrowserWindow({
    width: 800,
    height: 600
  })

win.webContents.openDevTools()
  
    const startUrl = process.env.ELECTRON_START_URL || url.format({
        pathname: path.join(__dirname, '/../build/index.html'),
        protocol: 'file:',
        slashes: true
    });
    win.loadURL(startUrl);


  // Emitted when the window is closed.
  win.on('closed', () => {
    win = null
  })
  
	let self = this;

	ipc.on('ready', function (event, arg) {
		client = redis.createClient({host: '192.168.99.100'});
		client.on('connect', function() {
			win.webContents.send('connected', arg)
     		console.log('Redis client connected');
		});  
	})

	ipc.on('set', function (event, arg) {
		client.set('test', '1')
	})

	ipc.on('get', function(event, arg) {
		client.get(arg, function (err, reply) {
			win.webContents.send('got', reply.toString())
		});
	})
}

app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (win === null) {
    createWindow()
  }
})
