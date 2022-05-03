const {contextBridge, ipcRenderer} = require("electron");

const logError = (message, onMainProcessEvent = () => {})  => {
    ipcRenderer.send("log", {
        type: "error",
        message: message,
    });
    ipcRenderer.once("main-process-event", onMainProcessEvent)
}
const logSuccess = (message, onMainProcessEvent = () => {}) => {
    ipcRenderer.send("log", {
        type: "success",
        message: message,
    })
    ipcRenderer.once("main-process-event", onMainProcessEvent)
}

contextBridge.exposeInMainWorld("logger", {
    "error": logError,
    "success": logSuccess,
});
