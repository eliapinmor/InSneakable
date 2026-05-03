import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SizeButton } from './size-button';

describe('SizeButton', () => {
  let component: SizeButton;
  let fixture: ComponentFixture<SizeButton>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SizeButton],
    }).compileComponents();

    fixture = TestBed.createComponent(SizeButton);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
