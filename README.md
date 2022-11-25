# NgxFeatureFlags

This is a feature flags library for Angular.
You could use it as a custom \*ngIf to show or hide elements based in a feature flags configuration.

## Version

| Number | Angular |
| ------ | ------- |
| 1.x    | 8       |
| 14.x    | 14      |

## Configuration

Create a feature.service.provider.ts with a factory provider.

```ts
// ngx-feature-flags.service.provider.ts
import { FeaturesConfigurationService } from "./features-configuration.service";
import { NgxFeatureFlagsService } from "ngx-feature-flags";

const featureFlagsServiceFactory = (provider: FeaturesConfigurationService) => {
  return new NgxFeatureFlagsService(provider.getFeatureFlags);
};

export let FeatureFlagServiceProvider = {
  provide: NgxFeatureFlagsService,
  useFactory: featureFlagsServiceFactory,
  deps: [FeaturesConfigurationService],
};

// features-configuration.service.ts
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class FeaturesConfigurationService {
  constructor() {}

  public getFeatureFlags = async (): Promise<Map<string, boolean>> => {
    const flags = new Map<string, boolean>();
    flags.set("featureA", true);
    flags.set("featureB", false);
    return flags;
  };
}
```

Add the service provider to providers array in app.module

```ts
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppComponent } from "./app.component";
import { FeatureFlagServiceProvider } from "./ngx-feature-flags.service.provider";
import { NgxFeatureFlagsModule } from "ngx-feature-flags";

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, NgxFeatureFlagsModule],
  providers: [FeatureFlagServiceProvider],
  bootstrap: [AppComponent],
})
export class AppModule {}
```

Finally, init the service

```ts
// App component
constructor(private flagService: NgxFeatureFlagsService) {
  this.flagService.initialize();
}
```

And the directives in the HTML

```html
<li *ngxShowIfFeature="'featureB'">
  <p>Feature B</p>
</li>
<li *ngxShowIfNotFeature="'featureC'">
  <p>Feature C</p>
</li>
```

There is also an Route guard

```ts
{
    path: 'path-to-feature-a',
    component: FeatureAComponent,
    canActivate: [ FeatureFlagsGuard ],
    data: { featureFlag: 'featureA' }
}
```

Finally, you could also check manually for features using the NgxFeatureFlagsService

```ts
constructor(private featureService: NgxFeatureFlagsService) {
    const aEnabled = this.featureService.featureOn('featureA');
}
```

## Testing

If you need to add unit test to your project check this project: [ngx-feature-flags-testing](https://www.npmjs.com/package/ngx-feature-flags-testing)
