import { Component, OnInit } from '@angular/core';
import { removeSpace } from '../../scripts/removeSpaceInString';
import { NapicuOS } from '../../system.napicuos';
import { commandLineSt, historyCommandsMetadata, inputMetadata, terminalColors } from './console';

export class Line {
  private declare line: string;
  private color: terminalColors = 'white';
  constructor(line: string, color: terminalColors) {
    this.line = line;
    this.color = color;
  }

  public Write(): historyCommandsMetadata {
    return { value: this.line, color: this.color };
  }

  public setColor(color: terminalColors): void {
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
  public static commandAc: commandLineSt = {
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
        }
        this.historyCommands.push(input);
      });
    } else {
      this.creatCommandLine([new Line('', 'white')]);
    }
    event.preventDefault();
  }

  //TODO
  public onArrow(event: KeyboardEvent): void {
    if (this.selectedCommandHistory > 0) {
      if (event.keyCode == 38) {
        this.selectedCommandHistory -= 1;
      } else if (event.keyCode == 40) {
        this.selectedCommandHistory -= 1;
      }
    }
  }

  private creatCommandLine(value: Line[], enteredCommand?: string): void {
    ConsoleComponent.lines.push({ lines: value, enteredCommand: enteredCommand });
  }

  get getCommandLineAc(): commandLineSt {
    return ConsoleComponent.commandAc;
  }

  get lines(): inputMetadata[] {
    return ConsoleComponent.lines;
  }

  get historyCommands(): string[] {
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
