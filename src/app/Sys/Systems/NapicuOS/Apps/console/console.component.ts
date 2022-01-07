import { Component, OnInit } from '@angular/core';
import { NapicuOS } from '../../system.napicuos';

@Component({
  selector: 'app-console',
  templateUrl: './console.component.html',
  styleUrls: ['./console.component.scss'],
})
export class ConsoleComponent implements OnInit {
  public lines: string[] = [];
  constructor() {}

  ngOnInit(): void {}

  public async onEnter(event: Event): Promise<void> {
    var i: HTMLElement = event.target as HTMLElement;
    var input = i.innerText;

    i.innerText = '';
    await NapicuOS.run_command(input.replace(/\s/g, '')).then((value: any) => {
      this.lines.push(value);
      console.log(this.lines);
      
    });
  }
}
