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
                driver: {
                    get: browserGetFn
                },
                manage: () => ({
                    addCookie: browserManageAddCookieFn
                })
            },
        };

        rejectFn = sinon.stub();
        resolveFn = sinon.stub();

        plugin = new ProtractorPlugin();
    });

    describe('constructor', () => {
        it('sets the baseUrl', () =>
            expect(plugin.baseUrl).toBe(`${BASE_URL}/ngapimock`));
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
            sinon.assert.calledWith(browserGetFn, 'url');
        }));

    describe('setCookie', () =>
        it('sets the cookie', async () => {
            await plugin.setCookie('name', 'value');
            sinon.assert.calledWith(browserManageAddCookieFn, {name: 'name', value: 'value'});
        }));
});
