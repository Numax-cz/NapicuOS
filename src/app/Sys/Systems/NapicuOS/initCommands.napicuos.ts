import {Command} from './SystemComponents/Command';
import {Line} from './Apps/console/console.component';
import {NapicuOS} from './system.napicuos';
import {Process} from './SystemComponents/Process';
import {removeSpace} from './scripts/removeSpaceInString';
import {getHelpCommand, getHelpCommandAPPS,} from './config/commands/help/getCommand';
import {SystemFile} from './SystemComponents/File';
import {CommandStateCodeMetadata} from './interface/Commands/CommandsCodes';
import {
  setHelpCommand,
  setHostnameHelpCommand,
  setHostnameLongError,
  setHostnameSet,
  setHostnameShortError,
  setWindowTitleHelpCommand
} from './config/commands/help/setCommand';
import {
  addUserAdded,
  addUserExists,
  addUserLongError,
  addUserShortError,
  addUserUsage
} from './config/commands/help/addUserCommand';
import {User} from './SystemComponents/User';
import {SystemCommandsPrefixEnum} from "./config/commands/Commands";
import {SystemDirStateData, SystemStateMetadata, SystemUserStateData} from './interface/System';
import {echoHelpCommand} from "./config/commands/help/echoCommand";
import {changeDirectoryHelpCommand, directoryNotFoundError} from "./config/commands/help/changeDirectoryCommand";
import {systemDirAFileMetadata} from './interface/FilesDirs/SystemDir';
import {TerminalClass} from "./SystemComponents/Terminal";
import {ReturnGetDirByPathMetadata} from "./interface/GetDirByPath";
import {SystemFileTypeEnumMetadata} from "./interface/FilesDirs/File";
import {mkdirExists, mkdirHelpCommand} from "./config/commands/help/mkdirCommand";
import {ReplaceSystemVariables} from "./scripts/ReplaceVariables";
import {notePadPathNotExists} from "./config/commands/help/notePadCommand";
import {PathSpliceLastIndex} from "./scripts/PathSplice";
import {initTouch} from "./commands/Touch";
import {initOpenApp} from "./commands/OpenApp";
import {initCreateUser} from "./commands/CrtUser";
import {initFileManager} from "./commands/FileManager";
import {initLogout} from "./commands/Logout";
import {initKillProcess} from "./commands/TskKill";
import {initChangeDirectory} from "./commands/Cd";
import {initWordPad} from "./commands/Note";
import {initGetSystemInformation} from "./commands/Get";
import {initEcho} from "./commands/Echo";
import {initPwd} from "./commands/Pwd";
import {initClearTerminal} from "./commands/Clear";
import {initExitFromConsole} from "./commands/Exit";
import {initSetSystemInformation} from "./commands/Set";
import {initLs} from "./commands/List";
import {initMkdir} from "./commands/Mkdir";





export function initAllCommands(): void {
  //? This is test for debugging
  NapicuOS.register_command(
    new Command('Terminal', SystemCommandsPrefixEnum.shellCommand, (params: string[] | undefined) => {
      return new Promise((resolve) => {
        resolve();
      });
    })
  );

  initGetSystemInformation();
  initExitFromConsole();
  initClearTerminal();
  initEcho();
  initMkdir();
  initLs();
  initTouch();
  initPwd();
  initChangeDirectory();
  initSetSystemInformation();
  initKillProcess();
  initCreateUser();
  initLogout();
  initOpenApp();
  //APPS
  initWordPad();
  initFileManager();
}






