import { app, BrowserWindow, globalShortcut, systemPreferences } from "electron";
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
		webPreferences: {
			nodeIntegration: false,
			contextIsolation: true,
			enableRemoteModule: false,
			preload: path.join(__dirname, 'preload.js')
		},
	}).once("ready-to-show", () => {
		win.show();
	});

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
	})

	// systemPreferences.on('accent-color-changed', (event, newColor) => {
	// 	console.log(`[theme] new Accent Color detected ${newColor}`);
	// 	win.webContents.send('fromAccentColor', newColor);
	// });
}

app.whenReady().then(createWindow);

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
