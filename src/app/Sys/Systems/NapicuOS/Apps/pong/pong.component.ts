import {AfterViewInit, Component, ElementRef, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Process} from "../../SystemComponents/Process";
import {NapicuEngineWindow} from "../../SystemComponents/Game/Window";
import {SYSTEM_GAME_CANVAS_RESOLUTION} from "../../config/SystemGame";
import {NapicuEngineGameMesh} from "../../SystemComponents/Game/Mesh";
import {KeyCodes} from "../../config/KeyCodes";
import {
  SYSTEM_APPS_PONG_HEIGHT,
  SYSTEM_APPS_PONG_MOVE_SPEED,
  SYSTEM_APPS_PONG_WIDTH,
  SYSTEM_APPS_PONG_X_POS
} from "../../config/Apps/Pong";

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

  protected ball: NapicuEngineGameMesh | null = null;

  protected bot: NapicuEngineGameMesh | null = null;

  protected score: number = 0;


  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.run(this.canvas, this.process);
  }

  ngOnDestroy(): void {
  }


  onInit(): void {
    this.score = 0;
    this.generatePlayer();
    this.generateBot();
  }

  override render(): void {
    if(this.player) this.renderMesh(this.player);
    if(this.bot) this.renderMesh(this.bot);

  }

  override update(): void {
    this.updatePlayer();
  }



  protected generatePlayer(): void {
    this.player = new NapicuEngineGameMesh(SYSTEM_APPS_PONG_X_POS, SYSTEM_GAME_CANVAS_RESOLUTION.y/2, SYSTEM_APPS_PONG_WIDTH, SYSTEM_APPS_PONG_HEIGHT, "white");
  }

  protected generateBot(): void {
    this.bot = new NapicuEngineGameMesh(SYSTEM_GAME_CANVAS_RESOLUTION.x - SYSTEM_APPS_PONG_X_POS, SYSTEM_GAME_CANVAS_RESOLUTION.y/2, SYSTEM_APPS_PONG_WIDTH, SYSTEM_APPS_PONG_HEIGHT, "white");
  }

  public updatePlayer(): void {
    if(this.player){
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
    }
  }

}
