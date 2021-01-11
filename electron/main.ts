/*
 * @Author: Lang Cheng
 * @Date: 2021-01-10 19:14:16
 * @LastEditTime: 2021-01-11 14:51:17
 * @LastEditors: Lang Cheng
 * @Description: electron
 * @FilePath: \2048\electron\main.ts
 */

import * as path from 'path';

/* eslint-disable import/no-extraneous-dependencies */
import { app, BrowserWindow } from 'electron';
/* eslint-enable import/no-extraneous-dependencies */

let mainWindow: Electron.BrowserWindow | null;

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 1100,
        height: 700,
        backgroundColor: '#191622',
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        }
    });

    if (process.env.NODE_ENV === 'development') {
        mainWindow.loadURL('http://localhost:4000');
        // Open the DevTools.
        mainWindow.webContents.openDevTools();
    } else {
        mainWindow.loadFile(path.join(__dirname, 'renderer/index.html'));
    }
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', () => {
    createWindow();

    app.on('activate', function () {
        // On macOS it's common to re-create a window in the app when the
        // dock icon is clicked and there are no other windows open.
        if (BrowserWindow.getAllWindows().length === 0) createWindow();
    });
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});
