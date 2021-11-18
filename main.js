const { app, BrowserWindow, Menu } = require('electron');

const url = require("url");
const path = require("path");

//register protocol scheme
if (process.defaultApp) {
  if (process.argv.length >= 2) {
    app.setAsDefaultProtocolClient('open-social', process.execPath, [path.resolve(process.argv[1])])
  }
} else {
  app.setAsDefaultProtocolClient('open-social')
}

const gotTheLock = app.requestSingleInstanceLock()

if (!gotTheLock) {
  app.quit()
} else {
  app.on('second-instance', (event, commandLine, workingDirectory) => {
    
    let url = new URL(commandLine[3])
    if (url.hostname === 'twitter-auth') {
      mainWindow.webContents.send('twitterAuth', commandLine[3]);
    }

    // Someone tried to run a second instance, we should focus our window.
    if (mainWindow) {
      if (mainWindow.isMinimized()) mainWindow.restore()
      mainWindow.focus()
    }
  })

  // Create mainWindow, load the rest of the app, etc...
  app.whenReady().then(() => {
    createWindow()
  })
  
  app.on('open-url', (event, url) => {
    console.log(event, url)
    dialog.showErrorBox('Welcome Back', `You arrived from: ${url}`)
  })
}


let mainWindow

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1280,
    height: 960,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js')
    }
  })

  mainWindow.loadURL(
    url.format({
      pathname: path.join(__dirname, `./dist/index.html`),
      protocol: "file:",
      slashes: true
    })
  );

  // createMenu()


  mainWindow.on('closed', function () {
    mainWindow = null
  })
}
// console.log(app);

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

// app.on('activate', function () {
//   if (mainWindow === null) createWindow()
// })


function createMenu() {
  var menu = Menu.buildFromTemplate([
    {
      label: 'Menu',
      submenu: [
        {label:'Home',
          click(){
            console.log("Navigate to Home");
            mainWindow.webContents.send('goToHome');
          }
        },
        {label:'About',
          click(){
            console.log("Navigate to About");
            mainWindow.webContents.send('goToHome');
          }
        },
        {label:'Exit',
          click() {
            app.quit()
          }
        }
      ]
    }
  ])
  Menu.setApplicationMenu(menu); 
}