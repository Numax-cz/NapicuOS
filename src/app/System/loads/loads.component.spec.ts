import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadsComponent } from './loads.component';

describe('LoadsComponent', () => {
  let component: LoadsComponent;
  let fixture: ComponentFixture<LoadsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoadsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
