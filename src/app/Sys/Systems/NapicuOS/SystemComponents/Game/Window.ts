import {Vector2f} from "../../interface/Vector2f";
import {SYSTEM_GAME_CANVAS_RESOLUTION} from "../../config/SystemGame";
import {ElementRef} from "@angular/core";
import {NapicuKeyboard} from "../../scripts/Events";
import {NapicuEngineGameObject} from "./Object";
import {SYSTEM_IMAGES} from "../../config/System";
import {Process} from "../Process";

export abstract class NapicuEngineWindow{
  protected readonly canvasResolution: Vector2f = SYSTEM_GAME_CANVAS_RESOLUTION;

  public declare canvas: ElementRef<HTMLCanvasElement>;

  public ctx: CanvasRenderingContext2D | null = null;

  public keyBoard: NapicuKeyboard = new NapicuKeyboard();

  protected requestId: number | undefined = undefined;

  protected gameProcess: Process | null = null;

  protected abstract backgroundColor: string;


  protected init(canvas: ElementRef<HTMLCanvasElement>): void {
    this.canvas = canvas;
    this.ctx = this.canvas.nativeElement.getContext("2d");

    this.canvas.nativeElement.width = this.canvasResolution.x;
    this.canvas.nativeElement.height = this.canvasResolution.y;

    window.addEventListener("keydown",  this.onKeyEvent);
    window.addEventListener("keyup", this.onKeyEvent);

    this.onInit();
  }

  public run(canvas: ElementRef<HTMLCanvasElement>, process: Process): void {
    this.init(canvas);
    this.gameProcess = process;
    window.requestAnimationFrame(this.loop);
  }

  public kill(): void {
    window.removeEventListener("keydown", this.onKeyEvent);
    window.removeEventListener("keyup", this.onKeyEvent);

    if (this.requestId) {
      window.cancelAnimationFrame(this.requestId);
      this.requestId = undefined;
    }
  }

  public abstract update(): void;

  public abstract render(): void;

  public abstract onInit(): void;

  public loop = (): void => {
    this.requestId = undefined;
    if (this.ctx){
      this.ctx.fillStyle = this.backgroundColor;
      this.ctx?.fillRect(0, 0, this.canvas.nativeElement.width, this.canvas.nativeElement.height);
    }

    this.update();
    this.render();

    if (!this.requestId) {
      this.requestId = window.requestAnimationFrame(this.loop);
    }
  }

  protected onKeyEvent = (event: KeyboardEvent): void => {
    if(this.gameProcess?.Window.activated){
      this.keyBoard.event(event);
    }
  }

  public renderObject(object: NapicuEngineGameObject): void {
    if(this.ctx){

      this.ctx.beginPath();
      this.ctx.save();
      this.ctx.translate((object.x - object.width/2 ) + object.width/2,  (object.y  - object.height/2) + object.height/2);

      this.ctx.rotate(object.getRotate() * Math.PI / 180);

      this.ctx.translate((-object.x + object.width/2) - object.width/2, (-object.y + object.height/2) - object.height/2);

      this.ctx.drawImage(object.texture.getTexture(), object.x - object.width/2 , object.y - object.height/2, object.width, object.height);
      this.ctx.restore();
    }else console.error("[NAPICUOS] NapicuEngine CTX Error");
  }
}
