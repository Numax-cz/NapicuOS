import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BootComponent } from './boot.component';

describe('BootComponent', () => {
  let component: BootComponent;
  let fixture: ComponentFixture<BootComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BootComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BootComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
