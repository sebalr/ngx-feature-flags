import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxFeatureFlagsComponent } from './ngx-feature-flags.component';

describe('NgxFeatureFlagsComponent', () => {
  let component: NgxFeatureFlagsComponent;
  let fixture: ComponentFixture<NgxFeatureFlagsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgxFeatureFlagsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxFeatureFlagsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
