import { NgxFeatureFlagsService } from "./ngx-feature-flags.service"

describe("NgxFeatureFlagsService", () => {
    
    describe("default values", () => {
        let service: NgxFeatureFlagsService;

        beforeEach(() => {
            service = new NgxFeatureFlagsService(() => Promise.resolve(new Map()))
        })
        it('should not be initialized', () => {
            expect(service.Initialized).toBe(false);
        })

        it('should define refresh$', () => {
            expect(service.refresh$).toBeDefined();
        })

        it('should emit refresh after init was called', async (done) => {
            expect
            service.refresh$.subscribe(c => {
                expect(c).toBe(true);
                done();
            });
            await service.initialize();
        })
    })

    it('should return true when feature is true and request featureOn', async() => {
        const featureConf = new Map<string, boolean>();
        featureConf.set('feature', true);
        const prom = Promise.resolve(featureConf)

        const service = new NgxFeatureFlagsService(()=> prom);
        await service.initialize();
        const result = service.featureOn('feature');
        expect(result).toBe(true);
    })
    it('should return false when feature is true and request featureOff', async() => {
        const featureConf = new Map<string, boolean>();
        featureConf.set('feature', true);
        const prom = Promise.resolve(featureConf)

        const service = new NgxFeatureFlagsService(()=> prom);
        await service.initialize();
        const result = service.featureOff('feature');
        expect(result).toBe(false);
    })
    it('should return false when feature is false and request featureOn', async() => {
        const featureConf = new Map<string, boolean>();
        featureConf.set('feature', false);
        const prom = Promise.resolve(featureConf)

        const service = new NgxFeatureFlagsService(()=> prom);
        await service.initialize();
        const result = service.featureOn('feature');
        expect(result).toBe(false);
    })
    it('should return true when feature is false and request featureOff', async() => {
        const featureConf = new Map<string, boolean>();
        featureConf.set('feature', false);
        const prom = Promise.resolve(featureConf)

        const service = new NgxFeatureFlagsService(()=> prom);
        await service.initialize();
        const result = service.featureOff('feature');
        expect(result).toBe(true);
    })
    it('should return false when feature not exists and request featureOn', async() => {
        const featureConf = new Map<string, boolean>();
        featureConf.set('feature', false);
        const prom = Promise.resolve(featureConf)

        const service = new NgxFeatureFlagsService(()=> prom);
        await service.initialize();
        const result = service.featureOn('nonExistingFeature');
        expect(result).toBe(false);
    })

    it('should return true when feature not exists and request featureOff', async() => {
        const featureConf = new Map<string, boolean>();
        featureConf.set('feature', false);
        const prom = Promise.resolve(featureConf)

        const service = new NgxFeatureFlagsService(()=> prom);
        await service.initialize();
        const result = service.featureOff('nonExistingFeature');
        expect(result).toBe(true);
    })
})