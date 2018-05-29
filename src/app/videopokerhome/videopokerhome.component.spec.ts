import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VideopokerhomeComponent } from './videopokerhome.component';

describe('VideopokerhomeComponent', () => {
  let component: VideopokerhomeComponent;
  let fixture: ComponentFixture<VideopokerhomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VideopokerhomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VideopokerhomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
