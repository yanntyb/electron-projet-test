const { app, BrowserWindow, ipcMain, dialog} = require('electron');
const path = require('path');
const fetch = require("node-fetch");

// Create the Browser Window and load the main html entry point.
let mainWindow = null;
const makeWindow = () => {
    mainWindow = new BrowserWindow({
        width: 1200,
        height: 600,
        center: true,
        title: "CTrack",
        icon: path.resolve(__dirname + "/assets/icon.png"),
        autoHideMenuBar: true,

        webPreferences: {
            preload: path.resolve(__dirname + "/preload.js"),
            devTools: true,
        }
    })

    mainWindow.webContents.openDevTools();
    mainWindow.loadFile('src/index.html');
};

// Create app when electron is ready.
app.whenReady().then(() => {
    makeWindow();
    // On MacOs, if app window does not exists, then create on 'activate' event.
    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            makeWindow()
        }
    })
});

// Closing app if all windows are closed BUT MacOs.
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
});

// Logger
ipcMain.on("log",(event, args) => {
    if("type" in args && "message" in args){
        console.table(args);
        console.log("Type: " + args.type + " => " + args.message);
        event.sender.send("main-process-event", "message logged");
    }
    else{
        console.error("Une erreur inconnue a reportée apr un des Render process")
    }
})

// Ajax request
ipcMain.handle("ajax-request", async (event, url) => {
    const response = await fetch(url);
    return response.json();
})

//Message box
ipcMain.handle("showMessageBox", (event, args) => {
    return dialog.showMessageBox(mainWindow, {
        title: "Test de titre",
        message: "Test de message",
    })
})