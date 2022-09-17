export class NapicuEngineGameMesh{

  public declare x: number;

  public declare y: number;

  public declare width: number

  public declare height: number;

  public declare velocityX: number;

  public declare velocityY: number

  public declare rotateDelta: number;

  public declare color: string;

  constructor(x: number, y: number, width: number, height: number, color: string) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.color = color;

    this.rotateDelta = 0;
    this.velocityX = 0;
    this.velocityY = 0;
  }
}
