import { FeaturesConfigurationService } from './features-configuration.service';
import { NgxFeatureFlagsService } from 'ngx-feature-flags';

const featureFlagsServiceFactory = (provider: FeaturesConfigurationService) => {
  return new NgxFeatureFlagsService(provider.getFeatureFlags);

};

export let FeatureFlagServiceProvider = {
  provide: NgxFeatureFlagsService,
  useFactory: featureFlagsServiceFactory,
  deps: [FeaturesConfigurationService]
};
