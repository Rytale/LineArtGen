const { autoUpdater } = require('electron-updater');

function setupAutoUpdater(mainWindow) {
  let updateCheckTimeout;

  autoUpdater.on('checking-for-update', () => {
    mainWindow.webContents.send('update_checking');
    
    // Set a timeout for the update check
    updateCheckTimeout = setTimeout(() => {
      mainWindow.webContents.send('update_timeout');
    }, 30000); // 30 seconds timeout
  });

  autoUpdater.on('update-available', () => {
    clearTimeout(updateCheckTimeout);
    mainWindow.webContents.send('update_available');
  });

  autoUpdater.on('update-not-available', () => {
    clearTimeout(updateCheckTimeout);
    mainWindow.webContents.send('update_not_available');
  });

  autoUpdater.on('update-downloaded', () => {
    clearTimeout(updateCheckTimeout);
    mainWindow.webContents.send('update_downloaded');
  });

  autoUpdater.on('error', (err) => {
    clearTimeout(updateCheckTimeout);
    mainWindow.webContents.send('update_error', err.toString());
  });

  // Check for updates immediately
  autoUpdater.checkForUpdatesAndNotify();
}

module.exports = { setupAutoUpdater };
