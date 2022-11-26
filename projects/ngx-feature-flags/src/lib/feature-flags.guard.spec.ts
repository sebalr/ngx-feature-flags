import { NgxFeatureFlagsService } from "./ngx-feature-flags.service";
import { FeatureFlagsGuard } from './feature-flags.guard';

describe('FeatureFlagsRouteGuard', () => {
    let featureFlagService: NgxFeatureFlagsService
    let initializedSpy: jasmine.Spy;
    let featureOnSpy: jasmine.Spy;
    let initSpy: jasmine.Spy;
    let guard: FeatureFlagsGuard;
    beforeEach(() => {
        featureFlagService = new NgxFeatureFlagsService(() => Promise.resolve(new Map()));
        featureOnSpy = spyOn(featureFlagService, 'featureOn');
        initializedSpy = spyOnProperty(featureFlagService, 'Initialized').and.returnValue(true);
        initSpy = spyOn(featureFlagService, 'initialize').and.returnValue(Promise.resolve())
        guard = new FeatureFlagsGuard(featureFlagService);
    })

    describe('when route data contains a feature flag', () => {
        const route = {data: {featureFlag: 'flag'}} as any;

        describe('when feature flag service is not initialized', () => {
          
            beforeEach(() => {
                initializedSpy.and.returnValue(false);
            })

            it('should call initialize when request can activate', async() => {
                await guard.canActivate(route);
                expect(initSpy).toHaveBeenCalledTimes(1);
            })
            it('should call initialize when request can activate child', async() => {
                await guard.canActivateChild(route);
                expect(initSpy).toHaveBeenCalledTimes(1);
            })

            describe('when feature is on', () => {
                beforeEach(() => {
                    featureOnSpy.and.returnValue(true);
                })

                it('should return true when request can activate',async () => {
                    const result = await guard.canActivate(route);
                    expect(result).toBe(true);
                })
                it('should return true when request can activate child',async () => {
                    const result = await guard.canActivateChild(route);
                    expect(result).toBe(true);
                })
            })
            describe('when feature is off', () => {
                beforeEach(() => {
                    featureOnSpy.and.returnValue(false);
                })

                it('should return true when request can activate',async () => {
                    const result = await guard.canActivate(route);
                    expect(result).toBe(false);
                })
                it('should return true when request can activate child',async () => {
                    const result = await guard.canActivateChild(route);
                    expect(result).toBe(false);
                })
            })
        })

        describe('when feature flag service is initialized', () => {
            beforeEach(() => {
                initializedSpy.and.returnValue(true);
            })

            describe('when feature is on', () => {
                beforeEach(() => {
                    featureOnSpy.and.returnValue(true);
                })

                it('should return true when request can activate',async () => {
                    const result = await guard.canActivate(route);
                    expect(result).toBe(true);
                })
                it('should return true when request can activate child',async () => {
                    const result = await guard.canActivateChild(route);
                    expect(result).toBe(true);
                })
            })
            describe('when feature is off', () => {
                beforeEach(() => {
                    featureOnSpy.and.returnValue(false);
                })

                it('should return true when request can activate',async () => {
                    const result = await guard.canActivate(route);
                    expect(result).toBe(false);
                })
                it('should return true when request can activate child',async () => {
                    const result = await guard.canActivateChild(route);
                    expect(result).toBe(false);
                })
            })
        })
    })

    describe('when route data contains no feature flag', () => {
        const route = {data:{}} as any;

        describe('when request can activate', () => {
            let result: boolean;
            beforeEach(async () => {
                result = await guard.canActivate(route);
            })
            it('should return true',async () => {
                expect(result).toBe(true);
            })
            it('should not call feature on when feature flag service is initialized',async () => {
                expect(featureOnSpy).toHaveBeenCalledTimes(0);
            })
            it('should not call initialize when feature flag service is not initialized',async () => {
                expect(initSpy).toHaveBeenCalledTimes(0);
            })
            it('should not call feature on when feature flag service is not initialized',async () => {
                expect(featureOnSpy).toHaveBeenCalledTimes(0);
            })
        })
        describe('when request can activate child', () => {
            let result: boolean;
            beforeEach(async () => {
                result = await guard.canActivateChild(route);
            })
            it('should return true',async () => {
                expect(result).toBe(true);
            })
            it('should not call feature on when feature flag service is initialized',async () => {
                expect(featureOnSpy).toHaveBeenCalledTimes(0);
            })
            it('should not call initialize when feature flag service is not initialized',async () => {
                expect(initSpy).toHaveBeenCalledTimes(0);
            })
            it('should not call feature on when feature flag service is not initialized',async () => {
                expect(featureOnSpy).toHaveBeenCalledTimes(0);
            })
        })
    })
})