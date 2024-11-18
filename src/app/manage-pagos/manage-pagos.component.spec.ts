import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagePagosComponent } from './manage-pagos.component';

describe('ManagePagosComponent', () => {
  let component: ManagePagosComponent;
  let fixture: ComponentFixture<ManagePagosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManagePagosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManagePagosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
