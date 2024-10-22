const { ipcRenderer } = require('electron');

document.addEventListener('DOMContentLoaded', () => {
  const status = document.getElementById('status');
  const messages = document.getElementById('messages');
  const menu = document.querySelector('.menu');
  const startAppButton = document.getElementById('startApp');
  const checkUpdatesButton = document.getElementById('checkUpdates');
  const loadingAnimation = document.querySelector('.loading-animation');

  function setStatus(message, isError = false) {
    status.textContent = message;
    status.style.color = isError ? '#ff6b6b' : '#ffffff';
  }

  function showMenu() {
    menu.classList.add('show');
    loadingAnimation.style.display = 'none';
  }

  function hideMenu() {
    menu.classList.remove('show');
    loadingAnimation.style.display = 'block';
  }

  // Simulate checking for updates
  setTimeout(() => {
    setStatus('Ready to start!');
    showMenu();
  }, 3000);

  startAppButton.addEventListener('click', () => {
    setStatus('Starting app...');
    hideMenu();
    ipcRenderer.send('start-app');
  });

  checkUpdatesButton.addEventListener('click', () => {
    setStatus('Checking for updates...');
    hideMenu();
    ipcRenderer.send('check-updates');
  });

  ipcRenderer.on('update_checking', () => {
    setStatus('Checking for updates...');
    hideMenu();
  });

  ipcRenderer.on('update_available', () => {
    setStatus('Update available');
    messages.innerHTML = 'A new update is available. Downloading now...';
    showMenu();
  });

  ipcRenderer.on('update_not_available', () => {
    setStatus('No updates available');
    messages.innerHTML = '';
    showMenu();
  });

  ipcRenderer.on('update_downloaded', () => {
    setStatus('Update ready');
    messages.innerHTML = 'Update Downloaded. It will be installed on restart. <button id="restartButton">Restart Now</button>';
    showMenu();
    
    document.getElementById('restartButton').addEventListener('click', () => {
      ipcRenderer.send('restart_app');
    });
  });

  ipcRenderer.on('update_error', (_, err) => {
    setStatus('Update error', true);
    messages.innerHTML = `Error: ${err}`;
    showMenu();
  });

  ipcRenderer.on('update_timeout', () => {
    setStatus('Update check timed out');
    messages.innerHTML = 'The update check took too long. Please try again later.';
    showMenu();
  });

  ipcRenderer.on('app_started', () => {
    setStatus('App is running');
    showMenu();
  });
});
