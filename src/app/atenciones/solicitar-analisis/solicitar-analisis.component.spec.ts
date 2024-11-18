import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SolicitarAnalisisComponent } from './solicitar-analisis.component';

describe('SolicitarAnalisisComponent', () => {
  let component: SolicitarAnalisisComponent;
  let fixture: ComponentFixture<SolicitarAnalisisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SolicitarAnalisisComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SolicitarAnalisisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
