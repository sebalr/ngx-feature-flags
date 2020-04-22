import { NgModule } from '@angular/core';
import { NgxFeatureFlagsComponent } from './ngx-feature-flags.component';
import { ShowIfFeatureDirective } from './show-if-feature.directive';
import { ShowIfNotFeatureDirective } from './show-if-not-feature.directive';



@NgModule({
  declarations: [NgxFeatureFlagsComponent, ShowIfFeatureDirective, ShowIfNotFeatureDirective],
  imports: [
  ],
  exports: [NgxFeatureFlagsComponent]
})
export class NgxFeatureFlagsModule { }
