import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Loader} from "../../SystemComponents/Loader";

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit, AfterViewInit {
  @ViewChild("Line") public declare line: ElementRef<HTMLElement>;
  protected declare loader: Loader;

  constructor() { }

  ngOnInit(): void {

  }

  ngAfterViewInit() {

    this.installSystem();
  }




  public installSystem = (): void =>{
    this.loader = new Loader(50, this.line, this.loadUser);
    this.loader.start();
  }

  public loadUser = (): void => {
    this.loader = new Loader(50, this.line, this.verify);
    this.loader.start();
  }

  public verify = (): void => {
    this.loader = new Loader(50, this.line, this.onEndLoad);
    this.loader.start();
  }

  public onEndLoad = (): void => {
    console.log("DONE")
  }

}
