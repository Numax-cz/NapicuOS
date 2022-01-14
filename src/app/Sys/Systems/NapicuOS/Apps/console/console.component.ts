import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NapicuOS } from '../../system.napicuos';
import {
  commandLineStMetadata,
  historyCommandsMetadata,
  inputMetadata,
  terminalColorsMetadata,
} from './console';

export class Line {
  private declare line: string;
  private color: terminalColorsMetadata = 'white';
  constructor(line: string, color: terminalColorsMetadata) {
    this.line = line;
    this.color = color;
  }

  public Write(): historyCommandsMetadata {
    return { value: this.line, color: this.color };
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
  private selectedCommandHistory: number = 0;
  @ViewChild('AppScreen') public declare appScreen: ElementRef;
  @ViewChild('InputValue') public declare inputValue: ElementRef;
  public static commandAc: commandLineStMetadata = {
    user: 'user',
    compName: 'napicu-os',
    path: '~',
  };
  private static lines: inputMetadata[] = [];
  private static historyCommands: string[] = [];
  constructor() {}

  ngOnInit(): void {}

  public async onEnter(event: Event): Promise<void> {
    var i: HTMLElement = event.target as HTMLElement;
    var input = i.innerText;
    var inputSplit = input.split(' ');
    var inputCmd = inputSplit[0];
    inputSplit.splice(0, 1);

    i.innerText = '';

    if (inputCmd) {
      await NapicuOS.run_command(inputCmd, inputSplit).then((value: Line[] | void) => {
        if (value) {
          this.creatCommandLine(value, input);
          this.setHistoryCommand(input);
        }
      });
    } else {
      this.creatCommandLine([new Line('', 'white')]);
    }
    this.scrollBottom();
    event.preventDefault();
  }

  //TODO
  private setCommandFromCommandHistory(): void {
    this.inputValue.nativeElement.innerText = ConsoleComponent.historyCommands[this.selectedCommandHistory];
  }

  /**
   * Auto scroll down function
   */
  private scrollBottom(): void {
    this.appScreen.nativeElement.scrollTo({ top: this.appScreen.nativeElement.scrollHeight });
  }

  /**
   * Sets and filters commands
   * @param input - Command entered
   */
  private setHistoryCommand(input: string): void {
    ConsoleComponent.historyCommands = ConsoleComponent.historyCommands.filter((value: string) => {
      return value !== input;
    });
    ConsoleComponent.historyCommands.push(input);
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
    if (this.selectedCommandHistory < ConsoleComponent.historyCommands.length - 1) {
      this.selectedCommandHistory += 1;
      this.setCommandFromCommandHistory();
    }
    event.preventDefault();
  }

  /**
   * Creates a new line
   * @param value - Array of lines to be displayed
   * @param enteredCommand - The command that appears as entered
   */
  private creatCommandLine(value: Line[], enteredCommand?: string): void {
    ConsoleComponent.lines.push({ lines: value, enteredCommand: enteredCommand });
  }

  /**
   * Returns basic command line information
   */
  get GetCommandLineAc(): commandLineStMetadata {
    return ConsoleComponent.commandAc;
  }

  /**
   * Returns array of all rows
   */
  get Getlines(): inputMetadata[] {
    return ConsoleComponent.lines;
  }

  /**
   * History of commands used
   */
  get GethistoryCommands(): string[] {
    return ConsoleComponent.historyCommands;
  }

  /**
   * Function for getting the command lines history
   */
  public static getCommandLines(): inputMetadata[] {
    return this.lines;
  }

  /**
   * Function for getting the history commands
   */
  public static gethistoryCommands(): string[] {
    return this.historyCommands;
  }

  /**
   * Funcion for deleting the history of console
   */
  public static delete_all_history(): void {
    this.lines = [];
    this.historyCommands = [];
  }
}
