const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const { setupAutoUpdater } = require('./utils/autoUpdater');
const { createWindow } = require('./components/mainWindow');

let mainWindow;

function initialize() {
  mainWindow = createWindow();
  setupAutoUpdater(mainWindow);

  ipcMain.on('start-app', () => {
    // Here you would typically initialize your app's main functionality
    console.log('Starting app...');
    mainWindow.webContents.send('app_started');
  });

  ipcMain.on('check-updates', () => {
    // Manually trigger update check
    setupAutoUpdater(mainWindow);
  });

  ipcMain.on('restart_app', () => {
    app.relaunch();
    app.exit(0);
  });
}

app.on('ready', initialize);

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit();
});

app.on('activate', function () {
  if (BrowserWindow.getAllWindows().length === 0) initialize();
});
