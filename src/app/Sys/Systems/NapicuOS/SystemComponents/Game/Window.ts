import {Vector2f} from "../../interface/Vector2f";
import {SYSTEM_GAME_CANVAS_RESOLUTION} from "../../config/SystemGame";
import {ElementRef} from "@angular/core";
import {NapicuKeyboard} from "../../scripts/Events";
import {NapicuEngineGameObject} from "./Object";
import {SYSTEM_IMAGES} from "../../config/System";

export abstract class NapicuEngineWindow{
  protected readonly canvasResolution: Vector2f = SYSTEM_GAME_CANVAS_RESOLUTION;

  public declare canvas: ElementRef<HTMLCanvasElement>;

  public ctx: CanvasRenderingContext2D | null = null;

  public keyBoard: NapicuKeyboard = new NapicuKeyboard();


  protected requestId: number | undefined = undefined;

  protected init(canvas: ElementRef<HTMLCanvasElement>): void {
    this.canvas = canvas;
    this.ctx = this.canvas.nativeElement.getContext("2d");

    this.canvas.nativeElement.width = this.canvasResolution.x;
    this.canvas.nativeElement.height = this.canvasResolution.y;

    window.addEventListener("keydown", this.keyBoard.event);
    window.addEventListener("keyup", this.keyBoard.event);

    this.onInit();
  }

  public run(canvas: ElementRef<HTMLCanvasElement>): void {
    this.init(canvas);
    window.requestAnimationFrame(this.loop);
  }

  public kill(): void {
    window.removeEventListener("keydown", this.keyBoard.event);
    window.removeEventListener("keyup", this.keyBoard.event);

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

    this.update();
    this.render();

    if (!this.requestId) {
      this.requestId = window.requestAnimationFrame(this.loop);
    }
  }

  public renderObject(object: NapicuEngineGameObject): void {
    this.ctx?.beginPath();
    this.ctx?.save();
    this.ctx?.translate((object.x - object.width/2 ) + object.width/2,  (object.y  - object.height/2) + object.height/2);

    this.ctx?.rotate(object.angle * Math.PI / 180);

    this.ctx?.translate((-object.x + object.width/2) - object.width/2, (-object.y + object.height/2) - object.height/2);
   // this.ctx?.rect(object.x, object.y, object.width, object.height);
    this.ctx?.drawImage(object.texture.getTexture(), object.x - object.width/2 , object.y - object.height/2, object.width, object.height);
    this.ctx?.restore();








  }

}
