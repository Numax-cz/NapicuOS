/**
 * @author Numax
 * @version 1.0.0
 */

const fs = require('fs');
const appDir = 'Sys/Systems';
const defaultDir = `./src/app/${appDir}`;
//const componentsName = 'components';
const appName = 'Apps';

var AppTitle;
var SystemTitle;

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



function Run() {
  if (SystemTitle && AppTitle) {
    if (fs.existsSync(`${defaultDir}/${SystemTitle}`)) {
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


function creatAngularComponent() {
  var path = `${appDir}/${SystemTitle}/${appName}/${SystemTitle.toLowerCase()}`;
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