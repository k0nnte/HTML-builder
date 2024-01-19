const path = require('path');
const fs = require('fs/promises');

async function create() {
  await fs.mkdir(path.resolve(__dirname, 'project-dist'), { recursive: true });
  await fs.copyFile(
    path.resolve(__dirname, 'template.html'),
    path.resolve(__dirname, 'project-dist', 'index.html'),
  );
  let str = await fs.readFile(
    path.resolve(__dirname, 'project-dist', 'index.html'),
    'utf-8',
  );
  const filesHTML = await fs.readdir(path.resolve(__dirname, 'components'));
  for (const iterator of filesHTML) {
    const file = await fs.readFile(
      path.resolve(__dirname, 'components', iterator),
      'utf-8',
    );
    const name = path.parse(
      path.resolve(__dirname, 'components', iterator),
    ).name;
    str = str.replace(`{{${name}}}`, file);
  }
  await fs.writeFile(
    path.resolve(__dirname, 'project-dist', 'index.html'),
    str,
  );

  const dircss = await fs.readdir(path.resolve(__dirname, 'styles'), {
    withFileTypes: true,
  });

  for (let i = 0; i < dircss.length; i++) {
    if (
      (await fs.stat(path.resolve(dircss[i].path, dircss[i].name))).isFile()
    ) {
      if (
        path.extname(path.resolve(dircss[i].path, dircss[i].name)) === '.css'
      ) {
        if (i === 0) {
          await fs.writeFile(
            path.resolve(__dirname, 'project-dist', 'style.css'),
            await fs.readFile(
              path.resolve(dircss[i].path, dircss[i].name),
              'utf-8',
            ),
          );
        } else {
          await fs.appendFile(
            path.resolve(__dirname, 'project-dist', 'style.css'),
            await fs.readFile(
              path.resolve(dircss[i].path, dircss[i].name),
              'utf-8',
            ),
          );
        }
      }
    }
  }
  async function copy(first, second) {
    await fs.mkdir(second, { recursive: true });
    const filecomplite = await fs.readdir(second, { withFileTypes: true });
    for (const iterator of filecomplite) {
      await fs.rm(path.resolve(iterator.path, iterator.name), {
        recursive: true,
        force: true,
      });
    }

    const filesdir = await fs.readdir(first, { withFileTypes: true });
    for (const iterator of filesdir) {
      if (
        (await fs.stat(path.resolve(iterator.path, iterator.name))).isFile()
      ) {
        await fs.copyFile(
          path.resolve(iterator.path, iterator.name),
          path.resolve(second, iterator.name),
        );
      } else if (
        (
          await fs.stat(path.resolve(iterator.path, iterator.name))
        ).isDirectory()
      ) {
        copy(
          path.resolve(iterator.path, iterator.name),
          path.resolve(second, iterator.name),
        );
      }
    }
  }
  copy(
    path.resolve(__dirname, 'assets'),
    path.resolve(__dirname, 'project-dist', 'assets'),
  );
}

create();
