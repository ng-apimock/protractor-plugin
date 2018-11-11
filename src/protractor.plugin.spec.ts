import {assert, SinonStub, stub} from 'sinon';
import ProtractorPlugin from './protractor.plugin';

describe('ProtractorPlugin', () => {
    let browserGetFn: SinonStub;
    let browserGetProcessedConfigThenFn: any;
    let browserManageAddCookieFn: SinonStub;
    let plugin: ProtractorPlugin;
    let deferredPromise: any;
    let resolveFn: SinonStub;
    let rejectFn: SinonStub;

    beforeAll(() => {
        browserGetProcessedConfigThenFn = stub();
        browserGetFn = stub();
        browserManageAddCookieFn = stub();
        deferredPromise = {};

        (global as any)['protractor'] = {
            browser: {
                baseUrl: 'http://localhost:9000',
                driver: {
                    get: browserGetFn
                },
                manage: () => ({
                    addCookie: browserManageAddCookieFn
                })
            },
        };

        rejectFn = stub();
        resolveFn = stub();

        plugin = new ProtractorPlugin();
    });

    describe('constructor', () => {
        it('sets the baseUrl', () =>
            expect(plugin.baseUrl).toBe(`${'http://localhost:9000'}/ngapimock`));
    });

    describe('constructor custom Url', () => {
        it('sets the baseUrl', () => {
            plugin = new ProtractorPlugin('http://newUrl:3000');
            expect(plugin.baseUrl).toBe(`http://newUrl:3000/ngapimock`);
        });
    });

    describe('openUrl', () =>
        it('opens the url', async () => {
            await plugin.openUrl('url');
            assert.calledWith(browserGetFn, 'url');
        }));

    describe('setCookie', () =>
        it('sets the cookie', async () => {
            await plugin.setCookie('name', 'value');
            assert.calledWith(browserManageAddCookieFn, { name: 'name', value: 'value' });
        }));
});
