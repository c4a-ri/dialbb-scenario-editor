const fs = require('fs').promises;
const path = require('path');

const projectRoot = process.cwd(); // package.json があるフォルダ
const src = path.resolve(projectRoot, '../LICENSE');
const dest = path.resolve(projectRoot, './LICENSE');

async function run() {
  try {
    await fs.copyFile(src, dest);
    console.log('LICENSEファイルをコピーしました');
  } catch (err) {
    console.error('LICENSEのコピーに失敗:', err);
    process.exit(1);
  }
}

run();
