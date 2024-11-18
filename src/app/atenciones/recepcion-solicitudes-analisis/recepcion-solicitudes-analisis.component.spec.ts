import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecepcionSolicitudesAnalisisComponent } from './recepcion-solicitudes-analisis.component';

describe('RecepcionSolicitudesAnalisisComponent', () => {
  let component: RecepcionSolicitudesAnalisisComponent;
  let fixture: ComponentFixture<RecepcionSolicitudesAnalisisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecepcionSolicitudesAnalisisComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecepcionSolicitudesAnalisisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
