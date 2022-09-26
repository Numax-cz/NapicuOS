/**
 * @author Numax
 * @version 1.0.0
 *
 * Script to easily start spring boot server
 */

const fs = require('fs');
const {exec} = require('child_process');
const workingDir = "./server"

let Profile;
process.argv.forEach(function (val, index) {
  switch (index) {
    case 2:
      Profile = val;
      break;
    default:
      break;
  }
});

function Run() {
  if (Profile){

    let i = exec(`.\\mvnw spring-boot:run -Dspring-boot.run.profiles=${Profile} -f pom.xml`,{ cwd: workingDir} , (error, stdout, stderr) => {
      console.log(stdout);
      console.log(stderr);
      if (error !== null) {
        console.error(error);
      }
    });

    i.stdout.on('data', function(data) {
      console.log(data);
    });


  }else {
    console.error(`
             Please enter parameters!
    `);
    console.error(`
        npm server <spring-boot-profile>
    `);
    process.exit(0);
  }
}

Run();
