import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { FeatureFlagServiceProvider } from './ngx-feature-flags.service.provider';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [FeatureFlagServiceProvider],
  bootstrap: [AppComponent]
})
export class AppModule { }
