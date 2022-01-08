import { Component, OnInit } from '@angular/core';
import { NapicuOS } from '../../system.napicuos';
import { commandLineSt } from './console';

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
  private static lines: string[] = [];
  private static historyCommands: string[] = [];
  constructor() {}

  ngOnInit(): void {}

  public async onEnter(event: Event): Promise<void> {
    const lines = ConsoleComponent.getCommandLines();
    const historyCommands = ConsoleComponent.gethistoryCommands();

    var i: HTMLElement = event.target as HTMLElement;
    var input = i.innerText;
    var inputWithoutSpace = input.replace(/\s+/g, '');
    i.innerText = '';
    if (inputWithoutSpace) {
      await NapicuOS.run_command(inputWithoutSpace).then((value: any) => {
        lines.push(value);
      });
    } else {
      lines.push('');
    }
    historyCommands.push(input);
    event.preventDefault();
  }

  get getCommandLineAc(): commandLineSt {
    return ConsoleComponent.commandAc;
  }

  get lines(): string[] {
    return ConsoleComponent.lines;
  }

  get historyCommands(): string[] {
    return ConsoleComponent.historyCommands;
  }

  /**
   * Function for getting the command lines history
   */
  public static getCommandLines(): string[] {
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
