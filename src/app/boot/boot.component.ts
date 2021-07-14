import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-boot',
  templateUrl: './boot.component.html',
  styleUrls: ['./boot.component.scss'],
})
export class BootComponent implements OnInit {
  public startTime: number = 0;
  constructor(
    @Inject(DOCUMENT) private doc: Document,
    private router: Router
  ) {}

  ngOnInit(): void {
    window.addEventListener('keydown', (e: KeyboardEvent) => this.RunBios(e));
  }

  public PlayBootSound(): void {}

  public RunBios = (e: KeyboardEvent): void => {
    if (e.keyCode == 46 || e.keyCode == 113) {
      setTimeout(() => {
        this.router.navigate(['bios/main'] /*{ skipLocationChange: true } */);
      }, this.startTime);
    }
  };
}
