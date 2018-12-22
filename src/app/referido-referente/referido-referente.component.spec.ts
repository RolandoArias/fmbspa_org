import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReferidoReferenteComponent } from './referido-referente.component';

describe('ReferidoReferenteComponent', () => {
  let component: ReferidoReferenteComponent;
  let fixture: ComponentFixture<ReferidoReferenteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReferidoReferenteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReferidoReferenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
