import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FeaturesConfigurationService {

  constructor() { }

  public getFeatureFlags = async (): Promise<Map<string, boolean>> => {
    const flags = new Map<string, boolean>();
    flags.set('featureA', true);
    flags.set('featureB', false);
    return flags;
  }
}
