import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestorAnalisisComponent } from './gestor-analisis.component';

describe('GestorAnalisisComponent', () => {
  let component: GestorAnalisisComponent;
  let fixture: ComponentFixture<GestorAnalisisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GestorAnalisisComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GestorAnalisisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
