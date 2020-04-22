import { TestBed } from '@angular/core/testing';

import { NgxFeatureFlagsService } from './ngx-feature-flags.service';

describe('NgxFeatureFlagsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NgxFeatureFlagsService = TestBed.get(NgxFeatureFlagsService);
    expect(service).toBeTruthy();
  });
});
