/*
 * @Author: Lang Cheng
 * @Date: 2021-01-10 19:14:16
 * @LastEditTime: 2021-01-10 20:17:24
 * @LastEditors: Lang Cheng
 * @Description: electron
 * @FilePath: \2048\electron\main.ts
 */

import * as path from 'path';
import * as url from 'url';

/* eslint-disable import/no-extraneous-dependencies */
import { app, BrowserWindow } from 'electron';
import installExtension, {
    REACT_DEVELOPER_TOOLS,
    REDUX_DEVTOOLS
} from 'electron-devtools-installer';
/* eslint-enable import/no-extraneous-dependencies */

let mainWindow: Electron.BrowserWindow | null;

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 1100,
        height: 700,
        backgroundColor: '#191622',
        webPreferences: {
            nodeIntegration: true
        }
    });

    if (process.env.NODE_ENV === 'development') {
        mainWindow.loadURL('http://localhost:4000');
    } else {
        mainWindow.loadURL(
            url.format({
                pathname: path.join(__dirname, 'renderer/index.html'),
                protocol: 'file:',
                slashes: true
            })
        );
    }

    mainWindow.on('closed', () => {
        mainWindow = null;
    });
}

/* eslint-disable no-console */
app.on('ready', createWindow)
    .whenReady()
    .then(() => {
        if (process.env.NODE_ENV === 'development') {
            installExtension(REACT_DEVELOPER_TOOLS)
                .then((name) => console.log(`Added Extension:  ${name}`))
                .catch((err) => console.log('An error occurred: ', err));
            installExtension(REDUX_DEVTOOLS)
                .then((name) => console.log(`Added Extension:  ${name}`))
                .catch((err) => console.log('An error occurred: ', err));
        }
    });
app.allowRendererProcessReuse = true;
/* eslint-enable no-console */
