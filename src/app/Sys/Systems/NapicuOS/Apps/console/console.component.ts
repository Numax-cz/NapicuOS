import { Component, OnInit } from '@angular/core';
import { NapicuOS } from '../../system.napicuos';
import { commandLineSt, historyCommandsSt, terminalColors } from './console';

export class Lines {
  public lines: string[] = [];
  public colors: terminalColors = 'white';
  constructor(lined: string[], color: terminalColors) {}
  public Write(): void {}
}

@Component({
  selector: 'app-console',
  templateUrl: './console.component.html',
  styleUrls: ['./console.component.scss'],
})
export class ConsoleComponent implements OnInit {
  public static commandAc: commandLineSt = {
    user: 'user',
    compName: 'napicu-os',
    path: '~',
  };
  private static lines: historyCommandsSt[] = [];
  private static historyCommands: string[] = [];
  constructor() {}

  ngOnInit(): void {
    this.creatCommandLine(['white', 'white', 'white', 'white'], 'white');
    this.creatCommandLine(['red', 'red', 'red', 'red'], 'red');
    this.creatCommandLine(['blue', 'blue', 'blue', 'blue'], 'blue');
    this.creatCommandLine(['green', 'green', 'green', 'green'], 'green');
  }

  public async onEnter(event: Event): Promise<void> {
    const lines = ConsoleComponent.getCommandLines();
    const historyCommands = ConsoleComponent.gethistoryCommands();

    var i: HTMLElement = event.target as HTMLElement;
    var input = i.innerText;
    var inputSplit = input.split(' ');
    var inputCmd = inputSplit[0];
    inputSplit.splice(0, 1);

    i.innerText = '';

    if (inputCmd) {
      await NapicuOS.run_command(inputCmd, inputSplit).then((value: any) => {
        this.creatCommandLine(value, 'white', input); //TODO cahge to value
        this.historyCommands.push(input);
      });
    } else {
      this.creatCommandLine([''], 'white');
    }
    // historyCommands.push(input);

    // console.log(historyCommands);

    event.preventDefault();
  }

  public creatCommandLine(value: string[], color: terminalColors, enteredCommand?: string): void {
    ConsoleComponent.lines.push({ value: value, color: color, enteredCommand: enteredCommand });
  }

  // public creatErrorCommandLine(value: string): void {
  //   ConsoleComponent.lines.push(value);
  // }

  get getCommandLineAc(): commandLineSt {
    return ConsoleComponent.commandAc;
  }

  get lines(): historyCommandsSt[] {
    return ConsoleComponent.lines;
  }

  get historyCommands(): string[] {
    return ConsoleComponent.historyCommands;
  }

  /**
   * Function for getting the command lines history
   */
  public static getCommandLines(): historyCommandsSt[] {
    return ConsoleComponent.lines;
  }
  /**
   * Function for getting the history commands
   */
  public static gethistoryCommands(): string[] {
    return ConsoleComponent.historyCommands;
  }
  /**
   * Funcion for deleting the history of console
   */
  public static delete_all_history(): void {
    this.lines = [];
    this.historyCommands = [];
  }
}
