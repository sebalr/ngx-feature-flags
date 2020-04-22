import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NgxFeatureFlagsService {

  private featureFlags: Map<string, boolean>;
  private initialized = false;

  get Initialized() {
    return this.initialized;
  }

  constructor(private initFun: () => Promise<Map<string, boolean>>) {
    this.featureFlags = new Map();
  }

  public featureOff(featureName: string) {
    return !this.featureOn(featureName);
  }

  public featureOn(featureName: string) {
    if (!featureName) {
      return true;
    }
    return this.featureFlags.has(featureName) && this.featureFlags.get(featureName);
  }


  // This method is called once and a list of features is stored in memory
  public async initialize() {
    this.featureFlags.clear();
    this.featureFlags = await this.initFun();
    this.initialized = true;
  }
}
