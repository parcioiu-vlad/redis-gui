const {app, BrowserWindow } = require('electron');
const path = require('path');
const url = require('url');

const ipc = require('electron').ipcMain;
let redis = require('redis');
let fs = require('fs');

let client = null;
// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win;
let redisClients = [];

function createWindow () {
  // Create the browser window.
  win = new BrowserWindow({
    width: 800,
    height: 600
  });

  win.webContents.openDevTools();

  const startUrl = process.env.ELECTRON_START_URL || url.format({
    pathname: path.join(__dirname, '/../build/index.html'),
    protocol: 'file:',
    slashes: true
  });
  win.loadURL(startUrl);

  //$ ssh -i key.pem -L 5432:postgres.example.us-east-1.rds.amazonaws.com:5432 ec2-user@example.compute-1.amazonaws.com

  let config = {
    username:'centos',
    host:'52.18.118.216',
    port:22,
    dstHost:'192.168.2.79',
    dstPort:6379,
    localHost:'127.0.0.1',
    localPort: 6379,
    privateKey: fs.readFileSync('/Users/vlad/workspace/key/vlad.pem'),
    keepAlive: true,
    debug: console.log,
  };
  let tunnel = require('tunnel-ssh');

  var server = tunnel(config, function (error, server) {
    console.log(error);
    console.log(server);

    ipc.on('set', function (event, arg) {
      client.set('test', '1')
    });

    ipc.on('get', function(event, arg) {
      client.get(arg, function (err, reply) {
        win.webContents.send('got', reply.toString())
      });
    });

    ipc.on('createConnection', function (event, arg) {
      let host = arg.host;
      let port = arg.port;
      let connectionName = arg.connectionName;

      let client = redis.createClient({host: host, port: port});


      //TODO add connect exception treatment
      client.on('connect', function() {
        redisClients.push(connectionName, client);
        //TODO send connection name
        console.log('connected');
        console.log(client);

        client.keys('*', function (err, keys) {
          if (err) return console.log(err);

          for(var i = 0, len = keys.length; i < len; i++) {
            console.log(keys[i]);
          }
        });

        win.webContents.send('connected', arg);
      });
    })
  });

  // Use a listener to handle errors outside the callback
  server.on('error', function(err){
    console.error('Something bad happened:', err);
  });

  // Emitted when the window is closed.
  win.on('closed', () => {
    win = null
  });

  let self = this;

}

app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
});

app.on('activate', () => {
  if (win === null) {
    createWindow()
  }
});
