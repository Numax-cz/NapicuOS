import {Component, OnInit} from '@angular/core';
import {WordsControllerService} from "../../../../../../../OpenAPI";
import {typeGameWordsLetterMetadata, typeGameWordsMetadata} from "../../interface/TypeGame";
import {SYSTEM_APPS_TYPE_GAME_WORDS_COUNT} from "../../config/Apps/TypeGame";
import {HttpErrorResponse} from "@angular/common/http";
import {SYSTEM_IMAGES} from "../../config/System";
import {NapicuOS} from "../../system.napicuos";

@Component({
  templateUrl: './typegame.component.html',
  styleUrls: ['./typegame.component.scss']
})
export class TypegameComponent implements OnInit {

  public words: typeGameWordsMetadata[] = [];

  public apiError: any | boolean = null;


  constructor(protected service: WordsControllerService) { }

  public ngOnInit(): void {
    this.loadApiData();
  }

  public restart(): void {
    this.ngOnInit();
  }

  public setTimer(): void {
    //TODO SET PROCESS
  }

  public onEnd(): void {
    //TODO ON END FUNCTION
  }

  public getWPM(): any{

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

  protected setWords(words: string[]): void {
    this.words = [];
    words.forEach((i: string) => {
      let value: typeGameWordsLetterMetadata[] = [];
      i.split('').forEach((element: string) => value.push({value: element, mistake: null}));
      this.words.push({value: i, mistake: false, letters: value});
    });
    this.apiError = false;
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

}
