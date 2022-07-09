import {AfterViewInit, Component, ElementRef, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {NapicuEngineWindow} from "../../SystemComponents/Game/Window";
import {NapicuEngineGameObject} from "../../SystemComponents/Game/Object";
import {SYSTEM_IMAGES, SYSTEM_SOUNDS} from "../../config/System";
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
import {NapicuOS} from "../../system.napicuos";



@Component({
  selector: 'app-flappy',
  templateUrl: './flappy.component.html',
  styleUrls: ['./flappy.component.scss']
})
export class FlappyComponent extends NapicuEngineWindow implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('NapicuCanvas') declare canvas: ElementRef<HTMLCanvasElement>;
  @Input() public declare process: Process;

  protected player: NapicuEngineGameObject | null= null;

  protected pipes: NapicuEngineGameObject[] = [];

  protected override backgroundColor = "#5fc5ce";

  protected score: number = 0;

  protected gameStarted: boolean = false;

  ngOnInit(): void {

  }

  ngOnDestroy(): void {
    this.kill();
  }

  ngAfterViewInit(): void {
    this.run(this.canvas, this.process);
  }

  override onInit() {
    this.score = 0;
    this.generatePipes();
    this.generatePlayer()
  }

  override update(): void {
    this.updatePipes();
    this.updatePlayer();
  }

  override render(): void {

    if(this.player) this.renderObject(this.player);

    this.pipes.forEach((pipe: NapicuEngineGameObject) => {
      this.renderObject(pipe);
    });

    this.renderScore();
  }

  protected generatePlayer(): void {
    this.player = new NapicuEngineGameObject(100, SYSTEM_GAME_CANVAS_RESOLUTION.y/2, 100, 120, SYSTEM_IMAGES.bird);
  }

  protected generatePipes(): void {
    for (let i = 0; i < SYSTEM_APPS_FLAPPY_PIPES_COUNT; i += 2){
      //Bottom
      this.pipes[i] = new FlappyPipe((i + 2) * SYSTEM_APPS_FLAPPY_PIPE_VOID_SIZE , this.getPipeRandomPosition());
      //Top
       let tp_pipe = new FlappyPipe(this.pipes[i].x, this.pipes[i].y - 1000);
       tp_pipe.rotate(180);
      this.pipes[i + 1] = tp_pipe;
    }

  }

  protected getPipeRandomPosition(): number{
    return (SYSTEM_GAME_CANVAS_RESOLUTION.y + FlappyPipe.height/2) - RandomNumber(80, SYSTEM_APPS_FLAPPY_PTP_SIZE);
  }

  protected updatePipes(): void {
    if(!this.gameStarted || !this.player) return;
    for(let i = 0; i < this.pipes.length; i ++){

      this.pipes[i].x -= SYSTEM_APPS_FLAPPY_PIPE_SPEED;

      //X position
      if(this.player.x + this.player.width/2 > this.pipes[i].x - FlappyPipe.width/2 &&  this.player.x - this.player.width/2 < this.pipes[i].x + FlappyPipe.width/2){
        //Y position TOP - BOT
        if((this.player.y - this.player.width/2) < this.pipes[i].y + FlappyPipe.height/2 && (this.player.y + this.player.width/2) > this.pipes[i].y - FlappyPipe.height/2){
          this.gameOver();
        }
      }

      if(this.pipes[i].x + SYSTEM_APPS_FLAPPY_PIPE_VOID_SIZE + FlappyPipe.width/2 < 0){

        this.pipes.splice(0, 2);

        //Bottom
        this.pipes.push(new FlappyPipe((this.canvas.nativeElement.width + FlappyPipe.width /2)  , this.getPipeRandomPosition()))

        //Top
        let tp_pipe = new FlappyPipe(this.pipes[this.pipes.length - 1].x, this.pipes[this.pipes.length - 1].y - 1000);
        tp_pipe.rotate(180);
        this.pipes.push(tp_pipe);
        this.score++;
      }
    }
  }

  protected gameOver(): void {
    this.gameStarted = false;
    NapicuOS.play_audio(SYSTEM_SOUNDS.FlappyGameOver, 0.3);

    this.onInit();
  }

  protected renderScore(): void {
    if(!this.ctx) return
    this.ctx.fillStyle = 'white';
    this.ctx.font = '80pt DosVGA';
    this.ctx.strokeStyle = 'black';
    this.ctx.textBaseline = 'top';
    this.ctx.fillText (this.score.toString(), this.canvas.nativeElement.width/2 - 53, 50);
    this.ctx.strokeText(this.score.toString(), this.canvas.nativeElement.width/2 - 53, 50);

    this.ctx.lineWidth = 4;

    this.ctx.fill();
    this.ctx.stroke();
  }

  protected updatePlayer(): void {
    if(!this.player) return;
    this.playerGravitation();
    if (this.keyBoard.isPressed(KeyCodes.SPACE)) {
      if (!this.gameStarted) this.gameStarted = true;

      NapicuOS.play_audio(SYSTEM_SOUNDS.FlappyJump, 0.3);

      //TODO CONFIG
      this.player.velocityY -= 25;

      this.player.rotateDelta = -0.4;
    }
    if(this.player.y  <= 0 || (this.player.y + this.player.height/2) >= this.canvas.nativeElement.height){
        this.gameOver();
    }
  }

  protected playerGravitation(): void {
    if(!this.gameStarted || !this.player) return;
    this.player.x += this.player.velocityX
    this.player.y += this.player.velocityY
    this.player.velocityY *= 0.93;
    this.player.velocityX *= 0.925;
    this.player.velocityY +=  0.8;


    this.player.rotateDelta +=  0.015;

    this.player.rotate(this.player.rotateDelta * 90);
  }
}
