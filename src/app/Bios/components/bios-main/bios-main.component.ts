import {Component, OnInit} from '@angular/core';
import {BiosMainInformation} from '../../Informations';
import {BiosSettings} from '../../ToolSettings';
import {Informations} from '../../interface/Informations';
import {settings, ToolSettings} from '../../interface/ToolSettings';
import {setTimeInterval} from '../../Scripts/TimeController';
import {isTime} from '../../Scripts/Type';

@Component({
  selector: 'app-bios-main',
  templateUrl: './bios-main.component.html',
  styleUrls: ['./bios-main.component.scss'],
})
export class BiosMainComponent implements OnInit {
  public MainOption: ToolSettings = BiosSettings.Main;
  public MainOptionInfo: Informations[] = BiosMainInformation();

  constructor() {
  }

  ngOnInit(): void {
    Object.values(this.MainOption.settings).forEach(
      (e: settings, i: number) => {
        if (isTime(e)) {
          setTimeInterval(Object.values(this.MainOption.settings), i);
        }
        return;
      }
    );
  }
}
