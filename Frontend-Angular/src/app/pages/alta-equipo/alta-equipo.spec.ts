import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AltaEquipo } from './alta-equipo';

describe('AltaEquipo', () => {
  let component: AltaEquipo;
  let fixture: ComponentFixture<AltaEquipo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AltaEquipo],
    }).compileComponents();

    fixture = TestBed.createComponent(AltaEquipo);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
