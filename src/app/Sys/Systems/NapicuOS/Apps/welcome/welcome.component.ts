import {AfterViewInit, Component, OnInit, TemplateRef, ViewChild} from '@angular/core';


interface barMetadata {
  value: string,
  template: TemplateRef<any>
}

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss'],
})
export class WelcomeComponent implements OnInit, AfterViewInit {
  @ViewChild('Welcome') public declare Welcome: TemplateRef<any>;
  @ViewChild('Users') public declare Users: TemplateRef<any>;
  @ViewChild('Install') public declare Install: TemplateRef<any>;

  protected barOptions: barMetadata[] = [];
  protected selectedBarOption: number = 0;


  constructor() {

  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.barOptions = [{value: "Welcome", template: this.Welcome}, {
      value: "Users",
      template: this.Users
    }, {value: "Install", template: this.Install}]
  }

  get GetBarOptions(): barMetadata[] {
    return this.barOptions
  }

  get GetSelectedBarOption(): number {
    return this.selectedBarOption
  }


}
