const {app, BrowserWindow, ipcMain, dialog} = require('electron')

const path = require('path')

async function handleFileOpen() {
  const { canceled, filePaths } = await dialog.showOpenDialog()
  if (canceled) {
    return
  } else {
    return filePaths[0]
  }
}

function createWindow () {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js') // 预加载js文件
    }
  })

  mainWindow.webContents.openDevTools()

  // icpMain
  ipcMain.on('set-title', (event, title) => {
    debugger
    const webContents = event.sender
    const win = BrowserWindow.fromWebContents(webContents)
    win.setTitle(title)
  })

  mainWindow.loadFile('client/index.html') // 加载
}

app.whenReady().then(() => {

  ipcMain.handle('dialog:openFile', handleFileOpen)
  
  createWindow()
  
  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})