import { NgModule } from '@angular/core';
import { ShowIfFeatureDirective } from './show-if-feature.directive';
import { ShowIfNotFeatureDirective } from './show-if-not-feature.directive';



@NgModule({
  declarations: [ShowIfFeatureDirective, ShowIfNotFeatureDirective],
  imports: [
  ],
  exports: [ShowIfFeatureDirective, ShowIfNotFeatureDirective]
})
export class NgxFeatureFlagsModule { }
