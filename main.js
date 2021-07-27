const { app, BrowserWindow } = require('electron');

//set env
process.env.NODE_ENV = 'development';
const isDev = process.env.NODE_ENV !== 'production' ? true : false;

//set platform
const isMac = process.platform === 'darwin' ? true : false;

//
let mainWindow;

//
function createMainWindow() {
    mainWindow = new BrowserWindow({
        title: 'ImageShrink',
        width: 500,
        height: 600,
        icon: './src/assets/icons/Icon_256x256.png',
        resizable: isDev ? true : false,
    });

    // mainWindow.loadURL(`https://www.pinterest.com/`)
    mainWindow.loadFile('./src/index.html')
}
//
app.whenReady().then(() => {
    createMainWindow();

      //
    app.on('activate', function () {
        if (BrowserWindow.getAllWindows().length === 0) createMainWindow()
      })
});
// app.on('ready', createMainWindow)

//window-all-closed
app.on('window-all-closed', function () {
    if (!isMac) app.quit()
})

//
app.allowRendererProcessReuse = true;   