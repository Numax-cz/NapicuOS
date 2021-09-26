/**
 * @author Numax-cz
 * @version 1.2.6
 * This script will create the basic structure of the new system.
 *
 * Warning, this script is simple,
 * any change to the folder path may affect the functionality of the script.
 *
 */

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

/**
 * Default path to systems
 */
const defaultDir = './src/app/Sys/Systems';

const fileClassconstructor = `import { System } from '../../System';

export class ${SystemTitle} extends System { }`;

const fileConfigBootPath = `export const ${SystemTitle}SystemPathName = '${SystemTitle.toLowerCase()}'`;

Run();

function Run() {
  if (!SystemTitle) return;
  var path = `${defaultDir}/${SystemTitle}`;
  var pathConfig = `${defaultDir}/${SystemTitle}/config`;

  if (!fs.existsSync(path)) {
    fs.mkdirSync(path, {
      recursive: true,
    });

    creatFile(`${path}`, `system.${SystemTitle}.ts`, fileClassconstructor);

    if (!fs.existsSync(pathConfig)) {
      fs.mkdirSync(pathConfig, {
        recursive: true,
      });
      creatFile(`${pathConfig}`, `boot.ts`, fileConfigBootPath);
    }

    creatAngularComponent();
  } else {
    console.error('The file exists');
    return;
  }
}

function creatFile(path, file, text) {
  var fileName = `${path}/${file}`;
  fs.writeFile(fileName, text, function (err) {
    if (!err) return;
    console.log(err);
  });
}

function creatAngularComponent() {
  var path = `Sys/Systems/${SystemTitle}/${SystemTitle.toLowerCase()}`;
  exec(`ng g c ${path}`, (error, stdout, stderr) => {
    console.log(stdout);
    console.log(stderr);
    if (error !== null) {
      console.error(error);
    } else {
      EndMessage();
    }
  });
}

function EndMessage() {
  const text = `
          A new system has been created!
  `;
  console.error(text);
}
