import {AfterViewInit, Component, ElementRef, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Process} from "../../SystemComponents/Process";
import {NapicuEngineWindow} from "../../SystemComponents/Game/Window";
import {SYSTEM_GAME_CANVAS_RESOLUTION} from "../../config/SystemGame";
import {NapicuEngineGameMesh} from "../../SystemComponents/Game/Mesh";
import {KeyCodes} from "../../config/KeyCodes";

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
    this.generatePlayer()
  }

  override render(): void {
    if(this.player) this.renderMesh(this.player);

  }

  override update(): void {
    this.updatePlayer();
  }



  protected generatePlayer(): void {
    this.player = new NapicuEngineGameMesh(100, SYSTEM_GAME_CANVAS_RESOLUTION.y/2, 20, 300, "white");
  }

  public updatePlayer(): void {
    if (this.keyBoard.isPressed(KeyCodes.KEY_W)) {
    }
    if (this.keyBoard.isPressed(KeyCodes.KEY_S)) {
    }

  }

}
