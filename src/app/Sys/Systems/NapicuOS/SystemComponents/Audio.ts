export class NapicuAudio {
  /**
   * Variable of the audio context
   */
  protected declare readonly _audio: HTMLAudioElement;

  /**
   * @param src The path of the audio file
   * @param gain The gain of the audio
   */
  constructor(src: string, gain?: number) {
    this._audio = new Audio(src);
    this._audio.volume = (gain === undefined) ? 0 : gain;
  }

  /**
   * Play the audio
   */
  public play(): void {
    this._audio.play();
  }
}
