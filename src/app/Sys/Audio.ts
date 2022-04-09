export class NapicuAudio {
  /**
   * The dir where the audio files are stored
   */
  protected readonly _defaultSoundFolder: string = 'assets/sound/';
  /**
   * Variable of the audio context
   */
  protected declare readonly _audio: HTMLAudioElement;

  /**
   * @param src The path of the audio file
   * @param gain The gain of the audio
   */
  constructor(src: string, gain?: number) {
    this._audio = new Audio(this._defaultSoundFolder + src);
    this._audio.volume = gain || 1;
  }

  /**
   * Play the audio
   */
  public play(): void {
    this._audio.play();
  }
}
