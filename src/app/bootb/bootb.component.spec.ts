import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BootbComponent } from './bootb.component';

describe('BootbComponent', () => {
  let component: BootbComponent;
  let fixture: ComponentFixture<BootbComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BootbComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BootbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
