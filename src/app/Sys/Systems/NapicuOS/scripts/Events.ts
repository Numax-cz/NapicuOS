export class NapicuKeyboard{

  public keyPressed: boolean[] = [];

  public event = (event: KeyboardEvent): void =>{
    this.keyPressed[event.keyCode] = (event.type == "keydown");
  }

}
