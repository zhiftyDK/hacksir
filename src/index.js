const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const path = require('path');

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  app.quit();
}

const createWindow = () => {
    // Create the browser window.
    const mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        titleBarStyle: 'hidden',
        webPreferences: {
            nodeIntegration: true,
            enableRemoteModule: true,
            contextIsolation: false,
            // devTools: false,
        }
    });

    // and load the index.html of the app.
    mainWindow.loadFile(path.join(__dirname, 'index.html'));
    
    ipcMain.on("minimizeApp", () => {
        mainWindow.minimize();
    });

    ipcMain.on("maximizeApp", () => {
        if(mainWindow.isMaximized()){
            mainWindow.restore();
        } else {
            mainWindow.maximize();
        }
    });

    ipcMain.on("closeApp", () => {
        mainWindow.close();
    });

    ipcMain.on("openDialog", event => {
        dialog.showOpenDialog({ properties:["openFile"] }).then((data) => {
            if (data.filePaths.length > 0) { event.sender.send("selectedFile", data.filePaths[0]); }
        })
    });
};

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});