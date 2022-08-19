import {Command} from './SystemComponents/Command';
import {NapicuOS} from './system.napicuos';
import {SystemCommandsPrefixEnum} from "./config/commands/Commands";
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
import {initSettings} from "./commands/Settings";
import {initEval} from "./commands/Calc";


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
  initEval();
  //APPS
  initWordPad();
  initFileManager();
  initSettings();
}






