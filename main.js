import { app, BrowserWindow } from 'electron'
import path from 'path'
import { fileURLToPath } from 'node:url'
import log from 'electron-log'
import Store from 'electron-store'

const store = new Store()

const __dirname = fileURLToPath(new URL('.', import.meta.url))

// 日志文件名，默认日志位置：
// Windows 开发：C:\Users\%USERPROFILE%\AppData\Roaming\Electron\logs
// Windows 安装：C:\Users\%USERPROFILE%\AppData\Roaming\项目名称\logs
// macOS 开发：/Users/$USER/Library/Logs/Electron
// macOS 安装：/Users/$USER/Library/Logs/项目名称
// Linux 开发：~/.config/Electron/logs
// Linux 运行 *.AppImage：~/.config/项目名称/logs
// Linux 安装 *.deb：~/.config/项目名称/logs
// Linux 安装 *.snap：~/snap/项目名称/x1/.config/项目名称/logs
log.transports.file.fileName = 'main.log'
log.scope.defaultLabel = 'main'
log.scope.labelPadding = 8

log.info('Hello from Electron 👋')

let devTools = store.get('devTools')
if (!(devTools instanceof Boolean)) {
  store.set('devTools', process.env.NODE_ENV === 'development')
}

// Windows 开发：C:\Users\%USERPROFILE%\AppData\Roaming\Electron\config.json
// Windows 安装：C:\Users\%USERPROFILE%\AppData\Roaming\项目名称\config.json
// macOS 开发：/Users/$USER/Library/Application Support/Electron/config.json
// macOS 安装：/Users/$USER/Library/Application Support/项目名称/config.json
// Linux 开发：~/.config/Electron/config.json
// Linux 运行 *.AppImage：~/.config/项目名/config.json
// Linux 安装 *.deb：~/.config/项目名/config.json
// Linux 安装 *.snap：~/snap/项目名/x1/.config/项目名/config.json
log.info('electron-store path', store.path)

const createWindow = () => {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      devTools: devTools,
    },
  })

  mainWindow.loadURL(process.env.VITE_SERVER_URL)

  mainWindow.webContents.openDevTools()
}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
