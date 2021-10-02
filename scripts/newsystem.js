/**
 * @author Numax
 * @version 1.2.6
 * This script will create the basic structure of the new system.
 *
 * Warning, this script is simple,
 * any change to the folder path may affect the functionality of the script.
 */

const fs = require('fs');
const { exec } = require('child_process');

//? Names of folder
const configName = 'config';
const scriptsName = 'scripts';
const componentsName = 'components';
const appsName = 'Apps';

//? Prefix for default script
const prefixFile = 'system';

//? Default path to systems
const appDir = 'Sys/Systems';
const defaultDir = `./src/app/${appDir}`;

//? Texts in files
const fileClassconstructor = `import { System } from '../../System';

export class ${SystemTitle} extends System { }`;

var SystemTitle;
process.argv.forEach(function (val, index) {
  switch (index) {
    case 2:
      SystemTitle = val;
      break;

    default:
      break;
  }
});

function Run() {
  if (!SystemTitle) return;
  const path = `${defaultDir}/${SystemTitle}`;
  const pathConfig = `${defaultDir}/${SystemTitle}/${configName}`;
  const pathComponents = `${defaultDir}/${SystemTitle}/${componentsName}`;
  const pathScripts = `${defaultDir}/${SystemTitle}/${scriptsName}`;
  const appsName = `${defaultDir}/${SystemTitle}/${appsName}`;

  if (!fs.existsSync(path)) {
    fs.mkdirSync(path, {
      recursive: true,
    });

    creatFile(`${path}`, `${prefixFile}.${SystemTitle}.ts`, fileClassconstructor);

    if (!fs.existsSync(pathConfig)) {
      fs.mkdirSync(pathConfig, {
        recursive: true,
      });
    }

    if (!fs.existsSync(pathScripts)) {
      fs.mkdirSync(pathScripts, {
        recursive: true,
      });
    }

    if (!fs.existsSync(appsName)) {
      fs.mkdirSync(appsName, {
        recursive: true,
      });
    }

    if (!fs.existsSync(pathComponents)) {
      fs.mkdirSync(pathComponents, {
        recursive: true,
      });

      creatAngularComponent();
    }
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
  var path = `${appDir}/${SystemTitle}/${componentsName}/${SystemTitle.toLowerCase()}`;
  console.log(path);
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
      * * * A new system has been created! * * * 
  `;
  console.error(text);
}

Run();
