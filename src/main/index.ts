import { app, BrowserWindow, globalShortcut, Tray, Menu, shell, systemPreferences } from "electron";
import path from "path";
import { pathToFileURL } from "url";
import appIpcMain from "./ipcMain";

const isDevelopment = process.env.NODE_ENV === "development";

function createWindow() {
	const win = new BrowserWindow({
		width: 600,
		height: 80,
		useContentSize: true,
		frame: false,
		resizable: false,
		transparent: true,
		show: false,
		skipTaskbar: true,
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

	// systemPreferences.on('accent-color-changed', (event, newColor) => {
	// 	console.log(`[theme] new Accent Color detected ${newColor}`);
	// 	win.webContents.send('fromAccentColor', newColor);
	// });
}

function optionsWindow() {
	const win = new BrowserWindow({
		width: 600,
		height: 600,
		resizable: false,
		webPreferences: {
			nodeIntegration: false,
			contextIsolation: true,
			enableRemoteModule: false,
			preload: path.join(__dirname, 'preload.js')
		},
	})

	if (isDevelopment) {
		win.loadURL("http://localhost:3000/options");
	} else {
		win.loadURL(
			pathToFileURL(path.join(__dirname, "./renderer/options.html")).toString()
		);
	}
}

function createTray() {
	const appIcon = new Tray('./src/main/icon.png');
	const contextMenu = Menu.buildFromTemplate([
		{ label: 'Options', type: 'normal', click: () => { optionsWindow() } },
		{ label: 'Exit', type: 'normal', click: () => { app.quit(); } }
	])

	appIcon.setContextMenu(contextMenu);
}

app.whenReady().then(createTray).then(createWindow);

app.on("window-all-closed", () => {
	if (process.platform !== "darwin") {
		app.quit();
	}
	return;
});

app.on("activate", () => {
	if (BrowserWindow.getAllWindows().length === 0) {
		createWindow();
	}
});
