/**
 * Enum for system commands prefix
 */
export const enum SystemCommandsPrefixEnum {
  shellCommand = "shell",
  addUserCommand = "adduser",
  getCommand = "get",
  setCommand = "set",
  killCommand = "kill",
  logoutCommand = "logout",
  exitCommand = "exit",
  openAppCommand = "openapp",
  clearCommand = "clear",
  clearCookiesCommand = "clcookies",
  cdCommand = "cd",
  echoCommand = "echo",
  calcCommand = "calc",
  listCommand = "ls",
  pwdCommand = "pwd",
  touchCommand = "touch",
  mkdirCommand = "mkdir",
  notePadCommand = "note",
  fileManagerCommand = "filemanager",
  settingsCommand = "settings",
  helpCommand = "help",
  rebootCommand = "reboot"
}


export const enum SystemCommandsArgsEnum {
  //Get
  get_SystemProcess = "process",
  get_Apps = "apps",
  get_Users = "users",
  get_Commands ="commands",

  //Shutdown
  reboot_kill_process = "-c",
  reboot_now= "now",

}
