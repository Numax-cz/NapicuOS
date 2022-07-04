import {KeyCodes} from "../config/KeyCodes";

export class NapicuKeyboard{

  protected keyPressed: boolean[] = [];

  public event = (event: KeyboardEvent): void =>{
    this.keyPressed[event.keyCode] = (event.type == "keydown");
  }

  public isPressed(keyCode: KeyCodes){
    return this.keyPressed[keyCode];
  }
}
