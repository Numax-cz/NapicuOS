import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {SystemGame} from "../../SystemComponents/Game/SystemGame";

@Component({
  selector: 'app-flappy',
  templateUrl: './flappy.component.html',
  styleUrls: ['./flappy.component.scss']
})
export class FlappyComponent extends SystemGame implements OnInit, AfterViewInit, OnDestroy {
  ngOnInit(): void {

  }

  ngOnDestroy(): void {
    this.kill();
  }

  ngAfterViewInit(): void {
    this.run();
  }



  render(): void {
  }

  update(): void {
  }






}
