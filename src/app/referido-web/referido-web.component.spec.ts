import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReferidoWebComponent } from './referido-web.component';

describe('ReferidoWebComponent', () => {
  let component: ReferidoWebComponent;
  let fixture: ComponentFixture<ReferidoWebComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReferidoWebComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReferidoWebComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
