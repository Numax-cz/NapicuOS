import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {NapicuEngine} from "../../SystemComponents/Game/NapicuEngine";



@Component({
  selector: 'app-flappy',
  templateUrl: './flappy.component.html',
  styleUrls: ['./flappy.component.scss']
})
export class FlappyComponent extends NapicuEngine.CanvasWindow implements OnInit, AfterViewInit, OnDestroy {

  protected player: NapicuEngine.GameObject = new NapicuEngine.GameObject(100, 100, 50, 50);

  ngOnInit(): void {

  }

  ngOnDestroy(): void {
    this.kill();
  }

  ngAfterViewInit(): void {
    this.run();
  }



  override update(): void {

  }


  override render(): void {

  }








}
