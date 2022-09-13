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
import {initHelp} from "./commands/Help";
import {initReboot} from "./commands/Reboot";
import {initClearCookiesTerminal} from "./commands/ClearCookies";


export function initAllCommands(): void {
  //? This is test for debugging


  initGetSystemInformation();
  initExitFromConsole();
  initClearTerminal();
  initEcho();
  initMkdir();
  initLs();
  initReboot();
  initTouch();
  initPwd();
  initChangeDirectory();
  initSetSystemInformation();
  initKillProcess();
  initCreateUser();
  initClearCookiesTerminal();
  initLogout();
  initOpenApp();
  initEval();
  initHelp();
  //APPS
  initWordPad();
  initFileManager();
  initSettings();
}






