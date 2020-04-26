import { FeaturesConfigurationService } from './features-configuration.service';
import { NgxFeatureFlagsService } from 'ngx-feature-flags';
import { ChangeDetectorRef, ApplicationRef } from '@angular/core';

const featureFlagsServiceFactory = (provider: FeaturesConfigurationService) => {
  return new NgxFeatureFlagsService(provider.getFeatureFlags);

};

export let FeatureFlagServiceProvider = {
  provide: NgxFeatureFlagsService,
  useFactory: featureFlagsServiceFactory,
  deps: [FeaturesConfigurationService]
};
