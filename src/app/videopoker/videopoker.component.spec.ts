import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VideopokerComponent } from './videopoker.component';

describe('VideopokerComponent', () => {
  let component: VideopokerComponent;
  let fixture: ComponentFixture<VideopokerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VideopokerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VideopokerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
