import {NapicuEngineTexture} from "./Texture";

export class NapicuEngineGameObject{

  public declare x: number;

  public declare y: number;

  public declare width: number

  public declare height: number;

  public declare texture: NapicuEngineTexture;

  protected declare angle: number;

  public declare velocityX: number;

  public declare velocityY: number

  public declare rotateDelta: number;

  constructor(x: number, y: number, width: number, height: number, srcTexture: string) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.texture = new NapicuEngineTexture(srcTexture);

    this.angle = 0;
    this.rotateDelta = 0;
    this.velocityX = 0;
    this.velocityY = 0;

  }

  public rotate(angle: number){
    this.angle = angle;
  }

  public onUpdate(){

  }

  public getRotate(): number {
    return this.angle;
  }
}
