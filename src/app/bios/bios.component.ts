import { Component, Inject, OnInit } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Router } from '@angular/router';
@Component({
  selector: 'app-bios',
  templateUrl: './bios.component.html',
  styleUrls: ['./bios.component.scss'],
})
export class BiosComponent implements OnInit {
  constructor(
    @Inject(DOCUMENT) private doc: Document,
    private router: Router
  ) {}

  ngOnInit(): void {
    window.addEventListener('keydown', (e: KeyboardEvent) => this.Move(e));
  }
  public static selected: number = 0;
  public BiosMenu = [
    {
      title: 'Main',
      router: 'main',
      id: 0,
    },
    {
      title: 'Ai Tweaker',
      router: 'tweaker',

      id: 1,
    },
    {
      title: 'Advanced',
      router: 'advanced',
      id: 2,
    },
    {
      title: 'Power',
      router: 'power',
      id: 3,
    },
    {
      title: 'Boot',
      router: 'bootb',
      id: 4,
    },
    {
      title: 'Tools',
      router: 'tools',
      id: 5,
    },
    {
      title: 'Exit',
      router: 'exit',
      id: 6,
    },
  ];
  get selected(): number {
    return BiosComponent.selected;
  }

  public Move = (e: KeyboardEvent): void => {
    setTimeout(() => {
      //ArrowRight
      if (
        e.keyCode == 39 &&
        BiosComponent.selected < this.BiosMenu.length - 1
      ) {
        BiosComponent.selected += 1;
        this.UpdateComponent();
      }
      //ArrowLeft
      if (e.keyCode == 37 && BiosComponent.selected !== 0) {
        BiosComponent.selected -= 1;
        this.UpdateComponent();
      }
    }, 55);
  };
  public UpdateComponent(): void {
    this.router.navigate(
      [`bios/${this.BiosMenu[BiosComponent.selected].router}`],
      { skipLocationChange: true }
    );
  }
  public more() {
    var l = 1 + 1;
  }
}
