import {AfterViewInit, Component, ElementRef, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {NapicuEngineWindow} from "../../SystemComponents/Game/Window";
import {NapicuEngineGameObject} from "../../SystemComponents/Game/Object";
import {SYSTEM_IMAGES} from "../../config/System";
import {
  SYSTEM_APPS_FLAPPY_PIPE_SPEED, SYSTEM_APPS_FLAPPY_PIPE_VOID_SIZE,
  SYSTEM_APPS_FLAPPY_PIPES_COUNT,
  SYSTEM_APPS_FLAPPY_PTP_SIZE
} from "../../config/Apps/Flappy";
import {SYSTEM_GAME_CANVAS_RESOLUTION} from "../../config/SystemGame";
import {FlappyPipe} from "./Pipe";
import {RandomNumber} from "../../scripts/RandomNumber";
import {KeyCodes} from "../../config/KeyCodes";
import {Process} from "../../SystemComponents/Process";



@Component({
  selector: 'app-flappy',
  templateUrl: './flappy.component.html',
  styleUrls: ['./flappy.component.scss']
})
export class FlappyComponent extends NapicuEngineWindow implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('NapicuCanvas') declare canvas: ElementRef<HTMLCanvasElement>;
  @Input() public declare process: Process;

  protected player: NapicuEngineGameObject = new NapicuEngineGameObject(100, SYSTEM_GAME_CANVAS_RESOLUTION.y/2, 100, 120, SYSTEM_IMAGES.bird);

  protected pipes: NapicuEngineGameObject[] = [];

  protected override backgroundColor = "#5fc5ce";

  ngOnInit(): void {

  }

  ngOnDestroy(): void {
    this.kill();
  }

  ngAfterViewInit(): void {
    this.run(this.canvas, this.process);
  }

  override onInit() {
    this.generatePipes();
  }

  override update(): void {
    this.updatePipes();
    this.updatePlayer();
  }

  override render(): void {

    this.renderObject(this.player);

    this.pipes.forEach((pipe: NapicuEngineGameObject) => {
      this.renderObject(pipe);
    });
  }


  protected generatePipes(): void {
    for (let i = 2; i < SYSTEM_APPS_FLAPPY_PIPES_COUNT + 2; i += 2){
      //Bottom
      this.pipes[i] = new FlappyPipe(i * SYSTEM_APPS_FLAPPY_PIPE_VOID_SIZE , (SYSTEM_GAME_CANVAS_RESOLUTION.y + FlappyPipe.height/2) - RandomNumber(150, SYSTEM_APPS_FLAPPY_PTP_SIZE) );
      //Top
       let tp_pipe = new FlappyPipe(this.pipes[i].x, this.pipes[i].y - 1000);
       tp_pipe.rotate(180);
      this.pipes[i + 1] = tp_pipe;
    }

  }

  protected updatePipes(): void {
    this.pipes.forEach((pipe: NapicuEngineGameObject) => {
      pipe.x -= SYSTEM_APPS_FLAPPY_PIPE_SPEED;
      if(pipe.x + SYSTEM_APPS_FLAPPY_PIPE_VOID_SIZE + pipe.width/2 < 0){
        pipe.x = this.canvas.nativeElement.width + pipe.width/2;
      }
    });

  }



  protected updatePlayer(): void {
    this.playerGravitation();
    if(this.keyBoard.isPressed(KeyCodes.SPACE)){

      //TODO CONFIG
      this.player.velocityY -= 25;

      this.player.rotateDelta = -0.4;

    }
  }

  protected playerGravitation(): void {
    this.player.x += this.player.velocityX
    this.player.y += this.player.velocityY
    this.player.velocityY *= 0.93;
    this.player.velocityX *= 0.925;
    this.player.velocityY +=  0.8;


    this.player.rotateDelta +=  0.015;

    this.player.rotate(this.player.rotateDelta * 90);
  }
}
