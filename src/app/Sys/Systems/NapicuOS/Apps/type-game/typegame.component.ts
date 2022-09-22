import {Component, OnDestroy, OnInit} from '@angular/core';
import {WordsControllerService} from "../../../../../../../OpenAPI";
import {
  typeGameScoreMetadata,
  typeGameTimerMetadata,
  typeGameWordMetadata,
  typeGameWordsLetterMetadata
} from "../../interface/TypeGame";
import {
  SYSTEM_APPS_TYPE_GAME_TIME_MINUTES,
  SYSTEM_APPS_TYPE_GAME_TIME_SECONDS,
  SYSTEM_APPS_TYPE_GAME_WORDS_COUNT
} from "../../config/Apps/TypeGame";
import {HttpErrorResponse} from "@angular/common/http";
import {SYSTEM_IMAGES} from "../../config/System";
import {NapicuOS} from "../../system.napicuos";
import {Process} from "../../SystemComponents/Process";

@Component({
  templateUrl: './typegame.component.html',
  styleUrls: ['./typegame.component.scss']
})
export class TypegameComponent implements OnInit, OnDestroy {

  public words: typeGameWordMetadata[] = [];

  public apiError: any | boolean = null;

  public showTimer: boolean = true;

  public declare timer: typeGameTimerMetadata;

  public timerProcess: Process | null = null;

  public declare selectedWordIndex: number;

  public declare inputValue: string | null;

  public declare launched: boolean;

  public declare noMove: boolean;

  public declare score: typeGameScoreMetadata;

  public declare previousWordPosition: number;


  constructor(protected service: WordsControllerService) {
    window.addEventListener('keydown', this.onSpaceBar, true);
    this.loadApiData();
  }

  public ngOnInit(): void {
    this.killTypeGameProcess();

    this.selectedWordIndex = 0;
    this.timer = {
      minutes: SYSTEM_APPS_TYPE_GAME_TIME_MINUTES,
      seconds: SYSTEM_APPS_TYPE_GAME_TIME_SECONDS,
    };

    this.score = {
      wrongWords: 0,
      wrongLetters: 0,
      letters: 0,
      words: 0,
    };
  }

  public ngOnDestroy() {
    window.removeEventListener('keydown', this.onSpaceBar, true);
    this.killTypeGameProcess();
  }

  public start(): void {
    this.launched = true;
    this.ngOnInit();
    this.setTimer();
  }

  public clickRestart(): void {
    this.loadApiData();
    this.ngOnInit();
  }

  public onEnd(): void {
    if(this.timerProcess){
      this.timerProcess.kill();
      this.timerProcess = null;
    }
  }

  public killTypeGameProcess(): void {
    if(this.timerProcess){
      this.timerProcess.kill();
      this.timerProcess = null;
    }
  }

  public getWPM(): number{
    return Math.round(this.score.letters / 5 / SYSTEM_APPS_TYPE_GAME_TIME_MINUTES + (SYSTEM_APPS_TYPE_GAME_TIME_SECONDS % 3600) / 60);
  }

  public loadApiData = () => {
    this.service.getWords(SYSTEM_APPS_TYPE_GAME_WORDS_COUNT).subscribe({
      next: (data: string[] | undefined) => {
        if(data) this.setWords(data);
        this.apiError = false;
      },
      error: (err: HttpErrorResponse) => {
        console.log(err);
        this.apiError = true;
      }
    })
  }

  protected setTimer(): void {
    this.timerProcess = new Process({
      processTitle: "TypeGameTimer",
      processInterval: {fun: (): void => {
          if (this.timer.seconds <= 0 && this.timer.minutes <= 0) {
            this.onEnd();
            return;
          }
          if (this.timer.seconds <= 0) {
            this.timer.seconds = 60;
            this.timer.minutes = 0;
          }
          this.timer.seconds--;
        }, time: 1000}
    }).run();
  }

  public onSpaceBar = (e: KeyboardEvent): void =>{
    if (e.keyCode !== 32 || this.noMove || !this.inputValue?.length) return;
    var element = document
      .getElementsByClassName(`napicuWord-${this.selectedWordIndex + 1}`)
      .item(0) as HTMLElement;

    if (this.previousWordPosition < element.offsetTop) {
      this.words.splice(0, this.selectedWordIndex + 1);
      this.selectedWordIndex = -1;
    }
    this.previousWordPosition = element.offsetTop;

    if (this.inputValue?.indexOf(' ') != 0) {
      this.checkFullText();
      if (this.GetSelecteWord()?.mistake) {
        this.score.wrongWords += 1;
      } else {
        this.score.words += 1;
      }

      this.inputValue = null;
      this.selectedWordIndex += 1;
      e.preventDefault();
    }
  }

  public onInputChange(e: string): void {
    if (!this.launched) this.start();
    if (this.noMove) return;
    this.checkMistakes();
    let letter: typeGameWordsLetterMetadata = this.GetSelecteWord().letters[e.length - 1];
    if (letter) {
      if (this.GetSelecteWord().mistake && letter.mistake == null) {
        this.score.wrongLetters += 1;
        letter.mistake = false;
      } else if (letter.mistake == null) {
        this.score.letters += 1;
        letter.mistake = true;
      }
    }
  }

  public checkMistakes(): void {
    let selectedWord = this.GetSelecteWord();
    let returnValue = false;
    if (this.inputValue && selectedWord) {
      const inputLetters = this.inputValue.split('');
      const selectedLetters = selectedWord.value?.split('');
      inputLetters.forEach((sL: string, index: number) => {
        if (sL !== selectedLetters[index]) {
          returnValue = true;
          return;
        }
      });
    }
    selectedWord.mistake = returnValue;
  }

  protected setWords(words: string[]): void {
    this.words = [];
    words.forEach((i: string) => {
      let value: typeGameWordsLetterMetadata[] = [];
      i.split('').forEach((element: string) => value.push({value: element, mistake: null}));
      this.words.push({value: i, mistake: false, letters: value});
    });
    this.apiError = false;
  }

  public checkFullText(): void {
    let selectedWord = this.GetSelecteWord();
    if (selectedWord && selectedWord.value.length !== this.inputValue?.length) selectedWord.mistake = true;
  }

  public switchDisplayTimer(): void{
    this.showTimer = !this.showTimer;
}

  get GetKeyBoardIcon(): string{
    return SYSTEM_IMAGES.keyboard;
  }

  get GetServerError(): string {
    return NapicuOS.get_language_words().Api.server_error;
  }

  get GetTryAgaiButton(): string {
    return NapicuOS.get_language_words().other.try_again;
  }

  public GetSelecteWord(): typeGameWordMetadata {
    return this.words[this.selectedWordIndex];
  }

}
