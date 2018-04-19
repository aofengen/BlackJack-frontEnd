import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmpassModalComponent } from './confirmpass-modal.component';

describe('ConfirmpassModalComponent', () => {
  let component: ConfirmpassModalComponent;
  let fixture: ComponentFixture<ConfirmpassModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmpassModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmpassModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
