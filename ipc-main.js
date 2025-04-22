import { ipcMain, shell } from 'electron'

ipcMain.on('open-external', (event, args) => {
  shell.openExternal(args).then((_) => {})
})
