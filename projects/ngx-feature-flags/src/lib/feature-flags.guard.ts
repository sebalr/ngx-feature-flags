import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, ActivatedRouteSnapshot } from '@angular/router';
import { NgxFeatureFlagsService } from './ngx-feature-flags.service';

@Injectable({
  providedIn: 'root'
})
export class FeatureFlagsGuard implements CanActivate, CanActivateChild {

  constructor(private featureFlagService: NgxFeatureFlagsService) { }

  async canActivate(route: ActivatedRouteSnapshot) {
    const featureFlag = route.data.featureFlag;

    if (!featureFlag) {
      return true;
    }

    if (this.featureFlagService.Initialized) {
      return this.featureFlagService.featureOn(featureFlag);
    } else {
      await this.featureFlagService.initialize();
      return this.featureFlagService.featureOn(featureFlag);
    }
  }

  async canActivateChild(route: ActivatedRouteSnapshot) {
    return await this.canActivate(route);
  }

}
