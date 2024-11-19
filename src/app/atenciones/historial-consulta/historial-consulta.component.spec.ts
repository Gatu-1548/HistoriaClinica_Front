import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistorialConsultaComponent } from './historial-consulta.component';

describe('HistorialConsultaComponent', () => {
  let component: HistorialConsultaComponent;
  let fixture: ComponentFixture<HistorialConsultaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HistorialConsultaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HistorialConsultaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
