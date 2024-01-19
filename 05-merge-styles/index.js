const path = require('path');
const fs = require('fs/promises');

async function create() {
  const mas = [];
  const style = await fs.readdir(path.resolve(__dirname, 'styles'), {
    withFileTypes: true,
  });
  for (const iterator of style) {
    if (iterator.isFile()) {
      if (path.extname(path.resolve(iterator.path, iterator.name)) === '.css') {
        mas.push(
          await (
            await fs.readFile(path.resolve(iterator.path, iterator.name))
          ).toString(),
        );
      }
    }
  }
  for (let i = 0; i < mas.length; i++) {
    if (i === 0) {
      await fs.writeFile(
        path.resolve(__dirname, 'project-dist', 'bundle.css'),
        mas[i],
      );
    } else {
      await fs.appendFile(
        path.resolve(__dirname, 'project-dist', 'bundle.css'),
        mas[i],
      );
    }
  }
}

create();
