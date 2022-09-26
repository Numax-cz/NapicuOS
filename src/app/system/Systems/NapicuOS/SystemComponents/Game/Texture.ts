export class NapicuEngineTexture{
  private declare readonly texture: HTMLImageElement;

  constructor(src: string) {
    this.texture = new Image();
    this.texture.src = src;
  }

  public getTexture(): HTMLImageElement {
    return this.texture;
  }

}
