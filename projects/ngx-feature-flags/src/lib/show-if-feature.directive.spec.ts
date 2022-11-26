import { Component } from "@angular/core";
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ShowIfFeatureDirective } from './show-if-feature.directive';
import { By } from '@angular/platform-browser';
import { NgxFeatureFlagsService } from './ngx-feature-flags.service';

@Component({
    template: `<input *ngxShowIfFeature="'featureB'" type="number" id="test"/>`
  })
  class HostComponent {}

  describe('ShowIfFeatureDirective', () => {
    let fixture: ComponentFixture<HostComponent>;
    let featureFlagService: NgxFeatureFlagsService;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        declarations: [ShowIfFeatureDirective, HostComponent],
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
        it('should show input', () => {
            const input = fixture.debugElement.query(By.css('#test'));
            expect(input).toBeDefined();
        })
    })
    describe('when feature is off', () => {
        beforeEach(() => {
            featureFlagService = TestBed.get(NgxFeatureFlagsService);
            spyOn(featureFlagService, 'featureOn').and.returnValue(false);
            fixture = TestBed.createComponent(HostComponent);
            fixture.detectChanges();
        })
        it('should hide input', () => {
            const input = fixture.debugElement.query(By.css('#test'));
            expect(input).toBeNull();
        })
    })
  });