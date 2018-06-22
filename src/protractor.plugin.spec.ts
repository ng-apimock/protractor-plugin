import * as sinon from 'sinon';
import ProtractorPlugin from './protractor.plugin';

describe('ProtractorPlugin', () => {
    const BASE_URL = 'http://localhost:9000';
    let browserGetFn: sinon.SinonStub;
    let browserGetProcessedConfigThenFn: any;
    let browserManageAddCookieFn: sinon.SinonStub;
    let plugin: ProtractorPlugin;
    let deferredPromise: any;
    let resolveFn: sinon.SinonStub;
    let rejectFn: sinon.SinonStub;

    beforeAll(() => {
        browserGetProcessedConfigThenFn = sinon.stub();
        browserGetFn = sinon.stub();
        browserManageAddCookieFn = sinon.stub();
        deferredPromise = {};

        (global as any)['protractor'] = {
            browser: {
                baseUrl: BASE_URL,
                getProcessedConfig: () => ({
                    then: browserGetProcessedConfigThenFn
                }),
                driver: {
                    get: browserGetFn
                },
                manage: () => ({
                    addCookie: browserManageAddCookieFn
                })
            },
            promise: {
                defer: () => ({
                    promise: deferredPromise
                })
            }
        };

        rejectFn = sinon.stub();
        resolveFn = sinon.stub();

        plugin = new ProtractorPlugin();
    });

    describe('constructor', () => {
        it('sets the baseUrl', () =>
            expect(plugin.baseUrl).toBe(`${BASE_URL}/ngapimock`));
    });

    describe('openUrl', () =>
        it('opens the url', async () => {
            await plugin.openUrl('url');
            sinon.assert.calledWith(browserGetFn, 'url');
        }));

    describe('setCookie', () =>
        it('sets the cookie', async () => {
            await plugin.setCookie('name', 'value');
            sinon.assert.calledWith(browserManageAddCookieFn, {name: 'name', value: 'value'});
        }));
});
