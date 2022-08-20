import {Component, OnInit, Pipe, PipeTransform} from '@angular/core';
import {DomSanitizer} from "@angular/platform-browser";
import {UrlChecker} from "../../scripts/UrlChecker";
import {SYSTEM_IMAGES} from "../../config/System";
import {HistoryLogger} from "../../scripts/HistoryLogger";

@Pipe({ name: 'safe' })
export class SafePipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) { }
  transform(url: string) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}

@Component({
  selector: 'app-browser',
  templateUrl: './browser.component.html',
  styleUrls: ['./browser.component.scss']
})
export class BrowserComponent implements OnInit {
  protected static readonly defaultURL: string = "";
  public pageHistory: HistoryLogger<string> = new HistoryLogger<string>();

  constructor() { }

  ngOnInit(): void {
    this.pageHistory.add(BrowserComponent.defaultURL);
  }

  public goToPage(url: string): void {
    if(!url.length) this.pageHistory.add("");
    else this.pageHistory.add(UrlChecker(url));
  }

  public clickBack() {

  }

  public clickNext() {

  }

  public search(value: string){
    this.pageHistory.add(`https://www.google.com/search?q=${value}`)
  }

  public clickHome(){
    this.pageHistory.add(BrowserComponent.defaultURL);
  }

  get GetSelectedURL(): string{
    return this.pageHistory.get();
  }


  get GetBackImage(): string {
    return SYSTEM_IMAGES.ArrowLeft;
  }

  get GetNextImage(): string {
    return SYSTEM_IMAGES.ArrowRight;
  }

  get GetHomeImage(): string {
    return SYSTEM_IMAGES.Home;
  }

}
