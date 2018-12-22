import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReferidoTlmkComponent } from './referido-tlmk.component';

describe('ReferidoTlmkComponent', () => {
  let component: ReferidoTlmkComponent;
  let fixture: ComponentFixture<ReferidoTlmkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReferidoTlmkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReferidoTlmkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
