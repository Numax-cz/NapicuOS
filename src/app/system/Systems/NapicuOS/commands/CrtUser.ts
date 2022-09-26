import {NapicuOS} from "../system.napicuos";
import {Command} from "../SystemComponents/Command";
import {SystemCommandsPrefixEnum} from "../config/commands/Commands";
import {SystemStateMetadata, SystemUserStateData} from "../interface/System";
import {User} from "../SystemComponents/User";
import {
  addUserAdded,
  addUserExists,
  addUserLongError,
  addUserShortError,
  addUserUsage
} from "../config/commands/help/addUserCommand";
import {CommandStateCodeMetadata} from "../interface/Commands/CommandsCodes";

export function initCreateUser(): void {
  NapicuOS.register_command(
    new Command('CreateUser', SystemCommandsPrefixEnum.addUserCommand, (params: string[] | undefined) => {
      return new Promise((resolve) => {
        if (params?.length == 2) {
          let username = params[0];
          let password = params[1];

          let usr: SystemUserStateData = NapicuOS.add_user(new User({username: username, password: password}));
          if (usr === SystemStateMetadata.StringTooShort) {
            resolve({
              linesForCMD: [addUserShortError],
              stateCode: usr,
            });
          } else if (usr === SystemStateMetadata.StringTooLong) {
            resolve({
              linesForCMD: [addUserLongError],
              stateCode: usr,
            });
          } else if (usr === SystemStateMetadata.UserExists) {
            resolve({
              linesForCMD: [addUserExists(username)],
              stateCode: usr,
            });
          }
          resolve({
            linesForCMD: [addUserAdded(username)],
            stateCode: usr,
          });

          //TODO ERROR ELSE
        } else {
          resolve({
            linesForCMD: [addUserUsage],
            stateCode: CommandStateCodeMetadata.HelpCommand,
          });
        }
      });
    }, "Creat a new user")
  );
}
