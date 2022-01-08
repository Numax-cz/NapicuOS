import { Component, OnInit } from '@angular/core';
import { NapicuOS } from '../../system.napicuos';
import { commandLineSt } from './console';

@Component({
  selector: 'app-console',
  templateUrl: './console.component.html',
  styleUrls: ['./console.component.scss'],
})
export class ConsoleComponent implements OnInit {
  public static commandLineAc: commandLineSt = {
    user: 'user',
    compName: 'napicu-os',
    path: '~',
  };
  public lines: string[] = [];
  public historyCommands: string[] = [];
  constructor() {}

  ngOnInit(): void {}

  public async onEnter(event: Event): Promise<void> {
    var i: HTMLElement = event.target as HTMLElement;
    var input = i.innerText;
    var inputWithoutSpace = input.replace(/\s+/g, '');
    i.innerText = '';
    if (inputWithoutSpace) {
      await NapicuOS.run_command(inputWithoutSpace).then((value: any) => {
        this.lines.push(value);
      });
    } else {
      this.lines.push('');
    }
    this.historyCommands.push(input);
    event.preventDefault();
  }
  get getCommandLineAc(): commandLineSt {
    return ConsoleComponent.commandLineAc;
  }
}
