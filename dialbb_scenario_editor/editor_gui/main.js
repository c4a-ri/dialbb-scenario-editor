// アプリケーション作成用のモジュールを読み込み
const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");
const { pathToFileURL } = require('url');


ipcMain.handle('get-user-data-path', () => {
  return app.getPath('userData');
});

// 起動引数から言語を取得
const langArg = (process.argv.find(arg => arg.startsWith('--lang=')) || '--lang=ja').split('=')[1];
const lang = langArg.startsWith('en') ? 'en' : langArg.startsWith('ja') ? 'ja' : 'ja';
console.log("lang:"+lang)

// メインウィンドウ
let mainWindow;

const createWindow = () => {
  // メインウィンドウを作成します
  mainWindow = new BrowserWindow({
    width: 800,
    height: 850,
    webPreferences: {
      // プリロードスクリプトは、レンダラープロセスが読み込まれる前に実行され、
      // レンダラーのグローバル（window や document など）と Node.js 環境の両方にアクセスできます。
      preload: path.join(__dirname, "preload.js"),
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: false,
    },
  });

  // メインウィンドウに表示するURLを指定（同じディレクトリのindex.html）
  // mainWindow.loadFile(__dirname + `/index.html?lang=${lang}`);
  const filePath = pathToFileURL(path.join(__dirname, 'index.html')).href;
  mainWindow.loadURL(`${filePath}?lang=${lang}`);

  // デベロッパーツールの起動(DEBUG)
  // mainWindow.webContents.openDevTools();

  // メインウィンドウが閉じられたときの処理
  mainWindow.on("closed", () => {
    mainWindow = null;
  });
};

//  初期化が完了した時の処理
app.whenReady().then(() => {
  createWindow();

  // アプリケーションがアクティブになった時の処理(Macだと、Dockがクリックされた時）
  app.on("activate", () => {
    // メインウィンドウが消えている場合は再度メインウィンドウを作成する
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

// 全てのウィンドウが閉じたときの処理
app.on("window-all-closed", () => {
  // macOSのとき以外はアプリケーションを終了させます
  if (process.platform !== "darwin") {
    app.quit();
  }
});
