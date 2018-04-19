import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangepassModalComponent } from './changepass-modal.component';

describe('ChangepassModalComponent', () => {
  let component: ChangepassModalComponent;
  let fixture: ComponentFixture<ChangepassModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChangepassModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangepassModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
