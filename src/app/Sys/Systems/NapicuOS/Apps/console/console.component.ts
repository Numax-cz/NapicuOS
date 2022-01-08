import { Component, OnInit } from '@angular/core';
import { NapicuOS } from '../../system.napicuos';
import { commandLineSt, historyCommandsSt, terminalColors } from './console';

export class Lines {
  private lines: string[] = [];
  private color: terminalColors = 'white';
  private enteredCommand?: string;
  constructor(lines: string[], color: terminalColors, enteredCommand?: string) {
    this.lines = lines;
    this.color = color;
    this.enteredCommand = enteredCommand;
  }

  public Write(): historyCommandsSt {
    return { value: this.lines, color: this.color, enteredCommand: this.enteredCommand };
  }

  public setColor(color: terminalColors): void {
    this.color = color;
  }

  public setEnteredCommand(enteredCommand: string): void {
    this.enteredCommand = enteredCommand;
  }
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
  private static lines: Lines[] = [];
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
      await NapicuOS.run_command(inputCmd, inputSplit).then((value: Lines) => {
        value.setEnteredCommand(input);
        this.creatCommandLine(value); //TODO cahge to value
        this.historyCommands.push(input);
      });
    } else {
      this.creatCommandLine(new Lines([''], 'white'));
    }
    // historyCommands.push(input);

    // console.log(historyCommands);

    event.preventDefault();
  }

  private creatCommandLine(value: Lines): void {
    ConsoleComponent.lines.push(value);
  }

  // public creatErrorCommandLine(value: string): void {
  //   ConsoleComponent.lines.push(value);
  // }

  get getCommandLineAc(): commandLineSt {
    return ConsoleComponent.commandAc;
  }

  get lines(): Lines[] {
    return ConsoleComponent.lines;
  }

  get historyCommands(): string[] {
    return ConsoleComponent.historyCommands;
  }

  /**
   * Function for getting the command lines history
   */
  public static getCommandLines(): Lines[] {
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
