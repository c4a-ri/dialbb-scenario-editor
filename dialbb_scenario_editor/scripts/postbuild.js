const fs = require('fs').promises;
const path = require('path');

const projectRoot = process.cwd(); // package.json があるフォルダ
const distDir = path.resolve(projectRoot, './dist');
const releaseDir = path.resolve(projectRoot, '../docs/files');

async function run() {
  try {
    const files = await fs.readdir(distDir);
    const installerFiles = files.filter(file =>
      /\.(exe|dmg|AppImage)$/.test(file)
    );

    for (const file of installerFiles) {
      const from = path.join(distDir, file);
      const to = path.join(releaseDir, file);
      await fs.copyFile(from, to);
      console.log(`インストーラをコピーしました: ${file}`);
    }
  } catch (err) {
    console.error('インストーラのコピーに失敗:', err);
    process.exit(1);
  }
}

run();
