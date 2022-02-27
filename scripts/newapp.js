/**
 * @author Numax
 * @version 1.1.0
 * This script creates the required application structure for the system
 *
 * Warning, this script is simple,
 * any change to the folder path may affect the functionality of the script.
 */

const fs = require('fs');
const {exec} = require('child_process');

let AppTitle;
let SystemTitle;
process.argv.forEach(function (val, index) {
  switch (index) {
    case 2:
      SystemTitle = val;
      break;
    case 3:
      AppTitle = val;
      break;

    default:
      break;
  }
});

const appDir = 'Sys/Systems';
const defaultDir = `./src/app/${appDir}`;
const prefixFile = 'system';
const appName = 'Apps';

const fileClassconstructor = `import { Process } from 'src/app/Sys/Process';

export class ${AppTitle} extends Process {
  public override title: string = '${AppTitle}';
}`;

function Run() {
  if (SystemTitle && AppTitle) {
    if (fs.existsSync(`${defaultDir}/${SystemTitle}`)) {
      let pathNewApp = `${defaultDir}/${SystemTitle}/${appName}/${AppTitle}`;
      if (!fs.existsSync(pathNewApp)) {
        fs.mkdirSync(pathNewApp, {
          recursive: true,
        });
        //creatFile(`${pathNewApp}`, `${prefixFile}.${AppTitle}.ts`, fileClassconstructor);
        creatAngularComponent();
      } else {
        console.error(`
             The "${AppTitle}"" app already exists
        `);
      }
    } else {
      console.error(`
             System "${SystemTitle}" does not exist
    `);
    }
  } else {
    console.error(`
             Please enter parameters!
    `);
    console.error(`
        npm newapp <system-name> <app-name>
    `);
  }
}

function creatFile(path, file, text) {
  let fileName = `${path}/${file}`;
  fs.writeFile(fileName, text, function (err) {
    if (!err) return;
    console.log(err);
  });
}

function creatAngularComponent() {
  let path = `${appDir}/${SystemTitle}/${appName}/${AppTitle.toLowerCase()}`;
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
      * * * A new app has been created! * * *
  `;
  console.error(text);
}

Run();
