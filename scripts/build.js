/**
 * @author Numax
 * @version 1.1.0
 * Script for easily build application
 */

const fs = require('fs');
const { exec } = require('child_process');


async function  main (){
  await updateOpenAPI();
  await buildApplication();
}


function updateOpenAPI(){
  return new Promise((resolve, reject) => {
    let cmd = exec("npm run build-openapi-prod");

    cmd.on("error", (er) => {
      console.log(er);
    });

    cmd.stdout.on('data', (data) => {
      console.log(data.toString());
    });

    cmd.stderr.on('data', (data) => {
      console.log(data)
    });

    cmd.on('close', (code) => {
      if (code === 0) {
        resolve(code);
      } else {
        reject(code);
      }
    });
  });
}

function buildApplication() {
  return new Promise((resolve, reject) => {
    let params = exec(`ng build --build-optimizer --extract-licenses --output-hashing none --optimization true`);

    params.on('error', (er) => {
      console.log(er);
    });

    params.stdout.on('data', (data) => {
      console.log(data.toString());
    });

    params.stderr.on('data', (data) => {
      process.stdout.write('.');
    });

    params.on('close', (code) => {
      if (code === 0) {
        resolve(code);
      } else {
        reject(code);
      }
    });
  });
}

main();
