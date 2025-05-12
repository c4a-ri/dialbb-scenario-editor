const { contextBridge, ipcRenderer } = require('electron');
const path = require('path');
const fs = require('fs');
const yaml = require('js-yaml');

// 起動引数から言語を取得
const args = process.argv;
const langArg = args.find(arg => arg.startsWith('--lang='));
const lang = langArg ? langArg.split('=')[1] : 'ja';
console.log("lang:"+lang)

// 多言語ファイルのパス
const localesPath = path.join(__dirname, 'static', 'data', 'gui_editor_text.yml');

// YAML読み込み
let gui_text_data = {};
try {
  const file = fs.readFileSync(localesPath, 'utf8');
  const rawData = yaml.load(file);

  for (const key in rawData) {
    if (lang.startsWith("ja") && rawData[key].ja) gui_text_data[key] = rawData[key].ja;
    else if (lang.startsWith("en") && rawData[key].en) gui_text_data[key] = rawData[key].en;
  }
} catch (e) {
  console.error("Failed to load translations:", e);
}


contextBridge.exposeInMainWorld('electronAPI', {
  getUserDataPath: () => ipcRenderer.invoke('get-user-data-path'),
  joinPath: (...args) => path.join(...args),
  guiText: gui_text_data,
});

