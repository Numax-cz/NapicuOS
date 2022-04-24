import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {CommandFunMetadata} from 'src/app/Sys/Systems/NapicuOS/SystemComponents/Command';
import {SYSTEM_DEFAULT_HOSTNAME} from '../../config/system';
import {removeSpace} from '../../scripts/removeSpaceInString';
import {NapicuOS} from '../../system.napicuos';
import {
  ConsoleClassMetadata,
  historyCommandsMetadata,
  inputMetadata,
  terminalColorsMetadata,
} from '../../interface/Apps/console';
import {NapicuOSSystemDir} from "../../config/drive";
import {systemDirAFileMetadata, systemDrivesMetadata} from "../../interface/FilesDirs/systemDir";
import {SystemCommandsPrefixEnum} from "../../interface/Commands/commands";

export class Line {
  private declare line: string;
  private color: terminalColorsMetadata = 'white';

  constructor(line: string, color?: terminalColorsMetadata) {
    this.line = line;
    this.color = color ? color : 'white';
  }

  public Write(): historyCommandsMetadata {
    return {value: this.line, color: this.color};
  }

  public setColor(color: terminalColorsMetadata): void {
    this.color = color;
  }
}

@Component({
  selector: 'app-console',
  templateUrl: './console.component.html',
  styleUrls: ['./console.component.scss'],
})
export class ConsoleComponent implements OnInit, ConsoleClassMetadata {
  /**
   * Store the history of commands
   */
  private static historyCommands: string[] = [];
  @ViewChild('AppScreen') public declare appScreen: ElementRef;
  @ViewChild('InputValue') public declare inputValue: ElementRef;
  private selectedCommandHistory: number = 0;
  /**
   * Determines if the specified command is currently running
   */
  private activeCommand: boolean = false;
  /**
   * The path the user is currently in
   */
  public pathString: string = '~';
  /**
   * Command line lines
   */
  public lines: inputMetadata[] = [];

  public activePath: systemDirAFileMetadata | undefined = NapicuOS.get_home_dir();

  constructor() {
  }

  /**
   * Returns the username
   */
  get GetUserName(): string {
    return NapicuOS.get_active_user()?.username || 'NULL';
  }

  /**
   * Returns the computer's name
   */
  get GetHostname(): string {
    return NapicuOS.get_hostname();
  }

  /**
   * Returns the path the user is in
   */
  get GetPath(): string {
    return this.pathString;
  }

  /**
   * Returns array of all rows
   */
  get GetLines(): inputMetadata[] {
    return this.lines;
  }


  get GetActiveCommand(): boolean {
    return this.activeCommand;
  }


  ngOnInit(): void {
  }

  /**
   * Function that is triggered by pressing enter
   */
  public async onEnter(event: Event): Promise<void> {
    let i: HTMLElement = event.target as HTMLElement;
    const input = i.innerText;
    let inputSplit = input.split(' ');
    let inputCmd = removeSpace(inputSplit[0].toLocaleLowerCase());
    inputSplit.splice(0, 1);
    i.innerText = '';
    this.activeCommand = true;


    if (inputCmd === SystemCommandsPrefixEnum.cdCommand) { //TODO DO
      let dir = inputSplit[0].split("/");
      //this.newLine(input);

      return;
    }
    //else if (inputCmd === SystemCommandsPrefixEnum.echoCommand) {
    //   this.newLine();
    // }


    if (inputCmd) {
      this.creatCommandLine([], input);
      this.setHistoryCommand(input);
      await NapicuOS.run_command(inputCmd, inputSplit, this).then(
        (value: CommandFunMetadata) => {
          if (value) {
            this.lines[this.lines.length - 1].lines = value.linesForCMD;
          }
        }
      );
    } else {
      this.creatCommandLine([]);
    }
    this.activeCommand = false;
    this.inputValue.nativeElement.focus();
    this.scrollBottom();
    event.preventDefault();
  }

  /**
   * Focus cursor on the input
   */
  public inputFocus(): void {
    this.inputValue.nativeElement.focus();
  }

  protected newLine(input?: string): void {
    this.creatCommandLine([], input || "");
    if (input) this.setHistoryCommand(input);
    this.activeCommand = false;
    this.inputValue.nativeElement.focus();
  }

  protected writeLine(value: string): void {
    this.lines[this.lines.length - 1].lines = [new Line(value)];
  }

  /**
   * Function that is triggered by pressing arrow up
   */
  public onArrowUp(event: Event): void {
    if (this.selectedCommandHistory > 0) {
      this.selectedCommandHistory -= 1;
      this.setCommandFromCommandHistory();

    } else if (ConsoleComponent.historyCommands.length) {
      this.selectedCommandHistory = ConsoleComponent.historyCommands.length - 1;
      this.setCommandFromCommandHistory();
    }
    event.preventDefault();
  }

  /**
   * Function that is triggered by pressing arrow down
   */
  public onArrowDown(event: Event): void {
    if (
      this.selectedCommandHistory <
      ConsoleComponent.historyCommands.length - 1
    ) {
      this.selectedCommandHistory += 1;
      this.setCommandFromCommandHistory();
    }
    event.preventDefault();
  }

  /**
   * Function for getting the command lines history
   */
  public getCommandLines(): inputMetadata[] {
    return this.lines;
  }

  /**
   * Function for deleting the history of console
   */
  public static delete_all_history(): void {
    ConsoleComponent.historyCommands = [];
  }

  /**
   * Sets the input value to the value according to the selected command from the history
   */
  private setCommandFromCommandHistory(): void {
    this.inputValue.nativeElement.innerText =
      ConsoleComponent.historyCommands[this.selectedCommandHistory];
  }

  /**
   * Auto scroll down function
   */
  private scrollBottom(): void {
    this.appScreen.nativeElement.scrollTo({
      top: this.appScreen.nativeElement.scrollHeight,
    });
  }

  /**
   * Sets and filters commands
   * @param input Command entered
   */
  private setHistoryCommand(input: string): void {
    ConsoleComponent.historyCommands = ConsoleComponent.historyCommands.filter(
      (value: string) => {
        return value !== input;
      }
    );
    ConsoleComponent.historyCommands.push(input);
  }

  /**
   * Creates a new line
   * @param value Array of lines to be displayed
   * @param enteredCommand The command that appears as entered
   */
  private creatCommandLine(value: Line[], enteredCommand?: string): void {
    this.lines.push({lines: value, enteredCommand: enteredCommand});
  }
}
