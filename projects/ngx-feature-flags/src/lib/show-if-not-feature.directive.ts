import { Directive, Input, TemplateRef, ViewContainerRef, OnInit } from '@angular/core';
import { NgxFeatureFlagsService } from '../public-api';

@Directive({
  selector: '[ngxShowIfNotFeature]'
})
export class ShowIfNotFeatureDirective implements OnInit {

  private featureName: string;

  @Input() set neoShowIfFeature(feature: string) {
    this.featureName = feature;
    this.showOrHide();
  }

  private hasView = false;


  constructor(private featureFlagService: NgxFeatureFlagsService, private templateRef: TemplateRef<any>, private vcr: ViewContainerRef) { }

  ngOnInit() {
    this.showOrHide();
  }

  private showOrHide() {
    if (this.featureName) {
      const featureOff = this.featureFlagService.featureOff(this.featureName);

      if (featureOff && !this.hasView) {
        this.vcr.createEmbeddedView(this.templateRef);
        this.hasView = true;
      } else if (!featureOff && this.hasView) {
        this.vcr.clear();
        this.hasView = false;
      }
    }
  }

}
