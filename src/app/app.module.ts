import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { FeatureFlagServiceProvider } from './ngx-feature-flags.service.provider';
import { NgxFeatureFlagsModule } from 'ngx-feature-flags';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    NgxFeatureFlagsModule
  ],
  providers: [FeatureFlagServiceProvider],
  bootstrap: [AppComponent]
})
export class AppModule { }
