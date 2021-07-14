import { Component, ComponentRef, Inject, OnInit } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Router } from '@angular/router';
import { Menu } from '../interface/Menu';
import { BiosSettings } from '../interface/BiosSettings';
@Component({
  selector: 'app-bios',
  templateUrl: './bios.component.html',
  styleUrls: ['./bios.component.scss'],
})
export class BiosComponent implements OnInit {
  public static selectedComponent: any;
  public static selected: number = 0;
  public BiosMenu: Menu[] = [
    {
      title: 'Main',
      router: 'main',
      id: 0,
    },
    {
      title: 'Advanced',
      router: 'advanced',
      id: 1,
    },
    {
      title: 'Power',
      router: 'power',
      id: 2,
    },
    {
      title: 'Boot',
      router: 'bootb',
      id: 3,
    },
    {
      title: 'Tools',
      router: 'tools',
      id: 4,
    },
    {
      title: 'Exit',
      router: 'exit',
      id: 5,
    },
  ];
  constructor(
    @Inject(DOCUMENT) private doc: Document,
    private router: Router
  ) {}

  ngOnInit(): void {
    window.addEventListener('keydown', (e: KeyboardEvent) => this.Move(e));
  }

  get selected(): number {
    return BiosComponent.selected;
  }
  public Activate(e: any): void {
    BiosComponent.selectedComponent = e;
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

      //ArrowDown & ArrowUp
      if (e.keyCode == 40 || e.keyCode == 38) {
        BiosComponent.selectedComponent.Move(e);
      }
    }, 55);
  };
  public UpdateComponent(): void {
    this.router.navigate(
      [`bios/${this.BiosMenu[BiosComponent.selected].router}`],
      { skipLocationChange: true }
    );
  }
}
