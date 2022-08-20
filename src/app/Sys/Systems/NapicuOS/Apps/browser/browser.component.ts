import {Component, OnInit, Pipe, PipeTransform} from '@angular/core';
import {DomSanitizer} from "@angular/platform-browser";
import {UrlChecker} from "../../scripts/UrlChecker";
import {SYSTEM_IMAGES} from "../../config/System";

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

  public iframePath: string = "https://google.com";
  public pageHistory: string[] = [];

  constructor() { }

  ngOnInit(): void {
  }


  public goToPage(url: string): void {
    let u = UrlChecker(url);
    this.pageHistory.push(u);
    this.iframePath = u;
  }

  public clickBack() {

  }

  public clickNext() {

  }

  get GetBackImage(): string {
    return SYSTEM_IMAGES.ArrowLeft;
  }

  get GetNextImage(): string {
    return SYSTEM_IMAGES.ArrowRight;
  }

}
