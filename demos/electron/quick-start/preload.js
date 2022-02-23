// 打开window之前加载的js文件
const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
    setTitle: (title) => ipcRenderer.send('set-title', title),
      openFile: () => ipcRenderer.invoke('dialog:openFile')
})