import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReferidoPromotorComponent } from './referido-promotor.component';

describe('ReferidoPromotorComponent', () => {
  let component: ReferidoPromotorComponent;
  let fixture: ComponentFixture<ReferidoPromotorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReferidoPromotorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReferidoPromotorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
