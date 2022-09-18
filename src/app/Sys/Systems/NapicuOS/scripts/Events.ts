import {KeyCodes} from "../config/KeyCodes";

export class NapicuKeyboard{

  protected keyPressed: boolean[] = [];

  public event = (event: KeyboardEvent): void =>{
    this.keyPressed[event.keyCode || event.which] = (event.type == "keydown");
  }

  public isPressed(keyCode: KeyCodes){
    return this.keyPressed[keyCode];
  }

  public isClicked(keyCode: KeyCodes){
    if(this.keyPressed[keyCode]){
      this.keyPressed[keyCode] = false;
      return !this.keyPressed[keyCode]
    }
    return false;
  }
}
