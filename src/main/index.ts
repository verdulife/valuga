import { app, BrowserWindow, globalShortcut, Tray, Menu, shell } from "electron";
import path from "path";
import { pathToFileURL } from "url";
import appIpcMain from "./ipcMain";

const isDevelopment = process.env.NODE_ENV === "development";

function mainWindow() {
	const win = new BrowserWindow({
		width: 600,
		minHeight: 80,
		useContentSize: true,
		show: false,
		skipTaskbar: true,
		resizable: false,
		frame: false,
		transparent: true,
		webPreferences: {
			nodeIntegration: false,
			contextIsolation: true,
			enableRemoteModule: false,
			preload: path.join(__dirname, 'preload.js')
		},
	})

	if (isDevelopment) {
		win.loadURL("http://localhost:3000");
		win.webContents.toggleDevTools();
	} else {
		win.loadURL(
			pathToFileURL(path.join(__dirname, "./renderer/index.html")).toString()
		);
	}

	win.removeMenu();
	appIpcMain(win);

	globalShortcut.register("CommandOrControl+Space", () => {
		if (win.isVisible()) win.hide();
		else win.show();
	});

	win.on("blur", () => {
		win.hide();
	});

	win.webContents.on('new-window', function (e, url) {
		e.preventDefault();
		shell.openExternal(url);
	});
}

let trayIcon = null;
function createTray() {
	trayIcon = new Tray('./src/main/icon.png');
	const contextMenu = Menu.buildFromTemplate([
		{ label: 'Exit', type: 'normal', click: () => { app.quit(); } }
	])

	trayIcon.setContextMenu(contextMenu);
}

app.whenReady().then(createTray).then(mainWindow);
