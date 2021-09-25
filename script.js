const fs = require('fs');

const { exec } = require('child_process');

var SystemTitle;
process.argv.forEach(function (val, index, array) {
  switch (index) {
    case 2:
      SystemTitle = val;
      break;

    default:
      break;
  }
});

const defaultDir = './src/app/Sys/Systems';

const fileClassconstructor = `
  import { System } from '../../System';
  export class ${SystemTitle} extends System { }
`;

Run();

function Run() {
  if (!SystemTitle) return;
  var path = `${defaultDir}/${SystemTitle}`;

  if (!fs.existsSync(path)) {
    fs.mkdirSync(path, {
      recursive: true,
    });

    creatFile(path);

    creatAngularComponent();
  } else {
    console.error('The file exists'); //TODO Error
    return;
  }
}

function creatFile(path) {
  var fileName = `${path}/system.${SystemTitle}.ts`;

  fs.writeFile(fileName, fileClassconstructor, function (err) {
    if (!err) return;
    console.log(err);
  });
}

function creatAngularComponent() {
  var path = `Sys/Systems/${SystemTitle}/${SystemTitle.toLowerCase()}`;

  var yourscript = exec(`ng g c ${path}`, (error, stdout, stderr) => {
    console.log(stdout);
    console.log(stderr);
    if (error !== null) {
      console.error(error);
    }
  });
}
