import { Component } from "@angular/core";
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NgxFeatureFlagsService } from './ngx-feature-flags.service';
import { ShowIfNotFeatureDirective } from './show-if-not-feature.directive';

@Component({
    template: `<input *ngxShowIfNotFeature="'featureB'" type="number" id="test"/>`
  })
  class HostComponent {}

  describe('ShowIfFeatureDirective', () => {
    let fixture: ComponentFixture<HostComponent>;
    let featureFlagService: NgxFeatureFlagsService;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        declarations: [ShowIfNotFeatureDirective, HostComponent],
        providers: [{provide: NgxFeatureFlagsService, useValue: new NgxFeatureFlagsService(() => Promise.resolve(new Map()))}]
      }).compileComponents();
  
      
    });
    
    describe('when feature is on', () => {
        beforeEach(() => {
            featureFlagService = TestBed.get(NgxFeatureFlagsService);
            spyOn(featureFlagService, 'featureOn').and.returnValue(true);
            fixture = TestBed.createComponent(HostComponent);
            fixture.detectChanges();
        })
        it('should hide input', () => {
            const input = fixture.debugElement.query(By.css('#test'));
            expect(input).toBeNull();
        })
    })
    describe('when feature is off', () => {
        beforeEach(() => {
            featureFlagService = TestBed.get(NgxFeatureFlagsService);
            spyOn(featureFlagService, 'featureOn').and.returnValue(false);
            fixture = TestBed.createComponent(HostComponent);
            fixture.detectChanges();
        })
        it('should show input', () => {
            const input = fixture.debugElement.query(By.css('#test'));
            expect(input).toBeDefined();
        })
    })
  });