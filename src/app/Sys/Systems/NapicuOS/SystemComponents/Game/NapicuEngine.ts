import {Vector2f} from "../../interface/Vector2f";
import {SYSTEM_GAME_CANVAS_RESOLUTION} from "../../config/SystemGame";
import {ElementRef} from "@angular/core";
import {NapicuKeyboard} from "../../scripts/Events";

export namespace NapicuEngine{
  export abstract class CanvasWindow{
    protected readonly canvasResolution: Vector2f = SYSTEM_GAME_CANVAS_RESOLUTION;

    public declare canvas: ElementRef<HTMLCanvasElement>;

    public ctx: CanvasRenderingContext2D | null = null;

    public keyBoard: NapicuKeyboard = new NapicuKeyboard();


    protected requestId: number | undefined = undefined;

    public init(canvas: ElementRef<HTMLCanvasElement>): void {
      this.canvas = canvas;
      this.ctx = this.canvas.nativeElement.getContext("2d");

      this.canvas.nativeElement.width = this.canvasResolution.x;
      this.canvas.nativeElement.height = this.canvasResolution.y;

      window.addEventListener("keydown", this.keyBoard.event);
      window.addEventListener("keyup", this.keyBoard.event);
    }

    public run(): void {

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

    public loop = (): void => {
      this.requestId = undefined;
      this.update();
      this.render();
      if (!this.requestId) {
        this.requestId = window.requestAnimationFrame(this.loop);
      }
    }
  }


  export class GameObject{

    constructor(public x: number, public y: number, public width: number, public height: number) {


    }


  }
}
