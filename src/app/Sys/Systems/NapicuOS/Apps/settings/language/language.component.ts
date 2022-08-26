import { Component, OnInit } from '@angular/core';
import {SYSTEM_IMAGES} from "../../../config/System";

@Component({
  selector: 'app-language',
  templateUrl: './language.component.html',
  styleUrls: ['./language.component.scss']
})
export class LanguageComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }


  get GetCzechFlag(): string{
    return SYSTEM_IMAGES.czechFlag;
  }

  get GetUSAFlag(): string {
    return SYSTEM_IMAGES.usaFlag;
  }

}
