import {ComponentFixture, TestBed} from '@angular/core/testing';

import {TweakerComponent} from './tweaker.component';

describe('TweakerComponent', () => {
    let component: TweakerComponent;
    let fixture: ComponentFixture<TweakerComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [TweakerComponent]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(TweakerComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
