const path = require('path');
const fs = require('fs/promises');

async function info(dirpath) {
  const files = await fs.readdir(dirpath, { withFileTypes: true });
  for (let el of files) {
    let rez;
    const stat = await fs.stat(path.join(el.path, el.name));
    if (stat.isFile()) {
      const filename = path.parse(path.join(el.path, el.name)).name;
      const filex = path.extname(path.join(el.path, el.name));
      rez = `${filename} - ${filex} - ${stat.size}b`;
      console.log(rez);
    }
  }
}

info(path.resolve(__dirname, 'secret-folder'));
