import {NapicuEngineGameObject} from "../../SystemComponents/Game/Object";
import {SYSTEM_IMAGES} from "../../config/System";


export class FlappyPipe extends NapicuEngineGameObject{

  protected static readonly srcTexture: string = SYSTEM_IMAGES.pipe;
  public static readonly width = 180;
  public static readonly height = 550;

  constructor(x: number, y: number) {
    super(x, y, FlappyPipe.width, FlappyPipe.height, FlappyPipe.srcTexture);
  }
}
