import { Directive, Input, TemplateRef, ViewContainerRef, OnInit, OnDestroy } from '@angular/core';
import { NgxFeatureFlagsService } from './ngx-feature-flags.service';
import { Subscription } from 'rxjs';

@Directive({
  selector: '[ngxShowIfFeature]'
})
export class ShowIfFeatureDirective implements OnInit, OnDestroy {

  private featureName: string;

  @Input() set ngxShowIfFeature(feature: string) {
    this.featureName = feature;
    this.showOrHide();
  }

  private hasView = false;
  private subs: Subscription;

  constructor(private featureFlagService: NgxFeatureFlagsService, private templateRef: TemplateRef<any>, private vcr: ViewContainerRef) { }

  ngOnInit() {
    this.subs = new Subscription();
    this.subs.add(this.featureFlagService.refresh$.subscribe(() => this.showOrHide()));
  }

  private showOrHide() {
    if (this.featureName) {
      const featureOn = this.featureFlagService.featureOn(this.featureName);

      if (featureOn && !this.hasView) {
        this.vcr.createEmbeddedView(this.templateRef);
        this.hasView = true;
      } else if (!featureOn && this.hasView) {
        this.vcr.clear();
        this.hasView = false;
      }
    }
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

}
