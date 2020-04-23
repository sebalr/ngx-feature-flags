import { TestBed } from '@angular/core/testing';

import { FeaturesConfigurationService } from './features-configuration.service';

describe('FeaturesConfigurationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FeaturesConfigurationService = TestBed.get(FeaturesConfigurationService);
    expect(service).toBeTruthy();
  });
});
