import {AfterViewInit, Component, ElementRef, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Process} from "../../SystemComponents/Process";
import {NapicuEngineWindow} from "../../SystemComponents/Game/Window";
import {SYSTEM_GAME_CANVAS_RESOLUTION} from "../../config/SystemGame";
import {NapicuEngineGameMesh} from "../../SystemComponents/Game/Mesh";
import {KeyCodes} from "../../config/KeyCodes";
import {
  SYSTEM_APPS_BALL_WIDTH,
  SYSTEM_APPS_PONG_HEIGHT,
  SYSTEM_APPS_PONG_MOVE_SPEED,
  SYSTEM_APPS_PONG_WIDTH,
  SYSTEM_APPS_PONG_X_POS
} from "../../config/Apps/Pong";
import {NapicuEngineGameBall} from "../../SystemComponents/Game/Ball";
import {RandomNumber} from "../../scripts/RandomNumber";
import {PongScoreMetadata} from "../../interface/Apps/Bot";

@Component({
  selector: 'app-pong',
  templateUrl: './pong.component.html',
  styleUrls: ['./pong.component.scss']
})
export class PongComponent extends NapicuEngineWindow implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild('NapicuCanvas') declare canvas: ElementRef<HTMLCanvasElement>;

  @Input() public declare process: Process;

  protected backgroundColor: string = "#000000";

  protected player: NapicuEngineGameMesh | null= null;

  protected ball: NapicuEngineGameBall | null = null;

  protected bot: NapicuEngineGameMesh | null = null;

  protected score: PongScoreMetadata = {player: 0, bot: 0};

  public started: boolean = false;


  ngOnInit(): void {
    window.addEventListener("keydown", this.onStartKey);
  }

  ngAfterViewInit(): void {
    this.run(this.canvas, this.process);
  }

  ngOnDestroy(): void {
    window.removeEventListener("keydown", this.onStartKey);
  }

  public onStartKey = (): void => {
    this.started = true;
  }

  onInit(): void {
    this.started = false;
    this.generatePlayer();
    this.generateBot();
    this.generateBall();
  }

  override render(): void {
    if(this.player) this.renderMesh(this.player);
    if(this.bot) this.renderMesh(this.bot);
    if(this.ball) this.renderBall(this.ball);
    this.renderScore();
    this.renderPressAnyKeyText();
  }

  override update(): void {
    if(this.started){
      this.updateBall();
      this.updatePlayer();
      this.updateBot();
    }
  }

  protected generatePlayer(): void {
    this.player = new NapicuEngineGameMesh(SYSTEM_APPS_PONG_X_POS, SYSTEM_GAME_CANVAS_RESOLUTION.y/2, SYSTEM_APPS_PONG_WIDTH, SYSTEM_APPS_PONG_HEIGHT, "white");
  }

  protected generateBot(): void {
    this.bot = new NapicuEngineGameMesh(SYSTEM_GAME_CANVAS_RESOLUTION.x - SYSTEM_APPS_PONG_X_POS, SYSTEM_GAME_CANVAS_RESOLUTION.y/2, SYSTEM_APPS_PONG_WIDTH, SYSTEM_APPS_PONG_HEIGHT, "white");
  }

  protected generateBall(): void{
    this.ball = new NapicuEngineGameBall(SYSTEM_GAME_CANVAS_RESOLUTION.x/2, SYSTEM_GAME_CANVAS_RESOLUTION.y/2, SYSTEM_APPS_BALL_WIDTH, "white");

    let randomY: number = RandomNumber(7, 14);

    this.ball.velocityX = Math.round(Math.random()) ? 22 : -(22);
    this.ball.velocityY = Math.round(Math.random()) ? randomY : -(randomY);
  }

  public updatePlayer(): void {
    if(this.player && this.ball){
      this.player.y += this.player.velocityY;
      if (this.keyBoard.isPressed(KeyCodes.KEY_W)) this.player.velocityY -= SYSTEM_APPS_PONG_MOVE_SPEED;
      if (this.keyBoard.isPressed(KeyCodes.KEY_S)) this.player.velocityY += SYSTEM_APPS_PONG_MOVE_SPEED;

      if(this.player.y  < 0) {
        this.player.y = 0;
        this.player.velocityY = 0;
      }
      else if (this.player.y + SYSTEM_APPS_PONG_HEIGHT > SYSTEM_GAME_CANVAS_RESOLUTION.y){
        this.player.y = SYSTEM_GAME_CANVAS_RESOLUTION.y - SYSTEM_APPS_PONG_HEIGHT;
        this.player.velocityY = 0;
      }

      this.player.velocityY *= 0.93;
      this.padCollision(this.player);
    }
  }

  public updateBot(): void {
    if(this.bot && this.ball){
      this.bot.y += this.bot.velocityY;

      if(this.bot.y  < 0) {
        this.bot.y = 0;
        this.bot.velocityY = 0;
      }
      else if (this.bot.y + SYSTEM_APPS_PONG_HEIGHT > SYSTEM_GAME_CANVAS_RESOLUTION.y){
        this.bot.y = SYSTEM_GAME_CANVAS_RESOLUTION.y - SYSTEM_APPS_PONG_HEIGHT;
        this.bot.velocityY = 0;
      }

      if (this.ball.x > SYSTEM_GAME_CANVAS_RESOLUTION.x/RandomNumber(1.33, 4.33)) this.bot.velocityY = this.ball.velocityY;

      this.bot.velocityY *= 0.93;
      this.padCollision(this.bot);
    }
  }

  protected padCollision(object: NapicuEngineGameMesh): void {
    if(this.ball){
      if ((this.ball.x - this.ball.width)  <= (object.x + object.width) && this.ball.x + this.ball.width >= (object.x)){
        if ((this.ball.y - this.ball.height)  <= (object.y + object.height) && this.ball.y + this.ball.height >= (object.y)) {
          this.ball.velocityX = -(this.ball.velocityX);
          this.ball.velocityY = -(this.ball.velocityY);
        }
      }
    }
  }

  public updateBall(): void {
    if(this.ball){
      this.ball.x += this.ball.velocityX;
     this.ball.y += this.ball.velocityY;

      if(this.ball.x - this.ball.width <= 0) {
        this.score.bot++;
        this.onInit();
      } else if(this.ball.x + this.ball.width >= SYSTEM_GAME_CANVAS_RESOLUTION.x){
        this.score.player++
        this.onInit();
      }

      if(this.ball.y - this.ball.width <= 0) this.ball.velocityY = -(this.ball.velocityY);
      if(this.ball.y + this.ball.width >= SYSTEM_GAME_CANVAS_RESOLUTION.y) this.ball.velocityY = -(this.ball.velocityY);
    }
  }

  protected renderScore(): void {
    if(!this.ctx) return
    const text: string  = `${this.score.player}/${this.score.bot}`;

    this.ctx.fillStyle = 'white';
    this.ctx.font = '80pt DosVGA';
    this.ctx.strokeStyle = 'black';
    this.ctx.textBaseline = 'top';
    this.ctx.textAlign = "center";

    this.ctx.fillText (text, this.canvas.nativeElement.width/2, 50);
    this.ctx.strokeText(text, this.canvas.nativeElement.width/2, 50);

    this.ctx.lineWidth = 4;

    this.ctx.fill();
    this.ctx.stroke();
  }

  protected renderPressAnyKeyText(): void {
    if(!this.ctx || this.started) return
    const text: string  = `Press any key to start`;

    this.ctx.fillStyle = 'white';
    this.ctx.font = '70pt DosVGA';
    this.ctx.strokeStyle = 'black';
    this.ctx.textBaseline = 'top';
    this.ctx.textAlign = "center";
    this.ctx.fillText (text, this.canvas.nativeElement.width/2, this.canvas.nativeElement.height/2 + 100);
    this.ctx.strokeText(text, this.canvas.nativeElement.width/2, this.canvas.nativeElement.height/2 + 100);

    this.ctx.lineWidth = 4;

    this.ctx.fill();
    this.ctx.stroke();
  }
}
