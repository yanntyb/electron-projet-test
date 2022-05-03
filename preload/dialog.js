const {contextBridge, ipcRenderer} = require("electron");

contextBridge.exposeInMainWorld("dialog", {
    showMessageBox: async () => {
        await ipcRenderer.invoke("showMessageBox");
    }
})