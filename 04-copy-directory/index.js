const path = require('path');
const fs = require('fs/promises');

async function copy() {
  fs.mkdir(path.resolve(__dirname, 'files-copy'), { recursive: true });
  const copyfile = await fs.readdir(path.resolve(__dirname, 'files-copy'));
  const files = await fs.readdir(path.resolve(__dirname, 'files'));
  for (const iterator of copyfile) {
    await fs.rm(path.resolve(__dirname, 'files-copy', iterator));
  }
  for (const iterator of files) {
    await fs.copyFile(
      path.resolve(path.resolve(__dirname, 'files'), iterator),
      path.resolve(__dirname, 'files-copy', iterator),
    );
  }
}

copy();
