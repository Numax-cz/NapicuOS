import {NapicuEngineGameMesh} from "./Mesh";

export class NapicuEngineGameBall extends NapicuEngineGameMesh{
  constructor(x: number, y: number, width: number, color: string) {
    super(x, y, width, width, color);
  }
}
