import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {CommandFunMetadata} from 'src/app/Sys/command';
import {system_computer_name} from '../../config/systemInfo';
import {removeSpace} from '../../scripts/removeSpaceInString';
import {NapicuOS} from '../../system.napicuos';
import {historyCommandsMetadata, inputMetadata, terminalColorsMetadata,} from './console';

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
export class ConsoleComponent implements OnInit {
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
  private path: string = '~';
  /**
   * Command line lines
   */
  private lines: inputMetadata[] = [];

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
  get GetcompName(): string {
    return system_computer_name;
  }

  /**
   * Returns the path the user is in
   */
  get Getpath(): string {
    return this.path;
  }

  /**
   * Returns array of all rows
   */
  get Getlines(): inputMetadata[] {
    return this.lines;
  }

  /**
   * History of commands used
   */
  get GethistoryCommands(): string[] {
    return ConsoleComponent.historyCommands;
  }

  get GetactiveCommand(): boolean {
    return this.activeCommand;
  }

  /**
   * Function for getting the history commands
   */
  public static gethistoryCommands(): string[] {
    return this.historyCommands;
  }

  ngOnInit(): void {
  }

  /**
   * Function that is triggered by pressing enter
   */
  public async onEnter(event: Event): Promise<void> {
    var i: HTMLElement = event.target as HTMLElement;
    const input = i.innerText;
    var inputSplit = input.split(' ');
    var inputCmd = removeSpace(inputSplit[0].toLocaleLowerCase());
    inputSplit.splice(0, 1);
    i.innerText = '';
    this.activeCommand = true;

    if (inputCmd === 'clear') {
      ConsoleComponent.historyCommands = [];
      this.lines = [];
      this.activeCommand = false;
      return;
    }
    if (inputCmd) {
      this.creatCommandLine([], input);
      await NapicuOS.run_command(inputCmd, inputSplit).then(
        (value: CommandFunMetadata) => {
          if (value) {
            this.lines[this.lines.length - 1].lines = value.linesForCMD;
            this.setHistoryCommand(input);
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

  /**
   * Function that is triggered by pressing arrow up
   */
  public onArrowUp(event: Event): void {
    if (this.selectedCommandHistory > 0) {
      this.selectedCommandHistory -= 1;
    } else {
      this.selectedCommandHistory = ConsoleComponent.historyCommands.length - 1;
    }
    this.setCommandFromCommandHistory();
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
   * Funcion for deleting the history of console
   */
  public delete_all_history(): void {
    this.lines = [];
    ConsoleComponent.historyCommands = [];
  }

  /**
   * Sets the input value to the value according to the selected command from the histo
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
   * @param input - Command entered
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
   * @param value - Array of lines to be displayed
   * @param enteredCommand - The command that appears as entered
   */
  private creatCommandLine(value: Line[], enteredCommand?: string): void {
    this.lines.push({lines: value, enteredCommand: enteredCommand});
  }
}
