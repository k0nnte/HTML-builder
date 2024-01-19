const path = require('path');
const fs = require('fs');
const read = require('readline');
const rl = read.createInterface({
  input: process.stdin,
  output: process.stdout,
});
const paths = path.resolve(__dirname, '02-write-file.txt');

fs.writeFile(paths, '', (err) => {
  if (err) {
    throw err;
  }
});

rl.setPrompt('введите текст, exit = выход\n');
rl.prompt();

rl.on('line', (name) => {
  if (name.toLowerCase() === 'exit') {
    rl.close();
  } else {
    fs.appendFile(paths, name, (err) => {
      if (err) {
        throw err.message;
      }
    });
  }
});

rl.on('close', () => {
  console.log('процесс завершён');
  process.exit();
});
