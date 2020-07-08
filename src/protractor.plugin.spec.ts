import { browser } from 'protractor';

import { ProtractorPlugin } from './protractor.plugin';

describe('ProtractorPlugin', () => {
    let browserGetFn: jest.Mock;
    let browserGetProcessedConfigThenFn: any;
    let browserManageAddCookieFn: jest.Mock;
    let plugin: ProtractorPlugin;
    let deferredPromise: any;
    let resolveFn: jest.Mock;
    let rejectFn: jest.Mock;

    beforeEach(() => {
        browserGetProcessedConfigThenFn = jest.fn();
        browserGetFn = jest.fn();
        browserManageAddCookieFn = jest.fn();
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

        rejectFn = jest.fn();
        resolveFn = jest.fn();

        plugin = new ProtractorPlugin({ baseUrl: browser.baseUrl });
    });

    describe('constructor', () => {
        it('sets the baseUrl', () => expect(plugin.baseUrl).toBe(`${'http://localhost:9000'}/ngapimock`));
    });

    describe('constructor custom path', () => {
        it('sets the baseUrl', () => {
            plugin = new ProtractorPlugin({ baseUrl: browser.baseUrl, basePath: 'myapimock' });
            expect(plugin.baseUrl).toBe('http://localhost:9000/myapimock');
        });
    });

    describe('openUrl', () => {
        it('opens the url', async () => {
            await plugin.openUrl('url');
            expect(browserGetFn).toHaveBeenCalledWith('url');
        });
    });

    describe('setCookie', () => {
        it('sets the cookie', async () => {
            await plugin.setCookie('name', 'value');
            expect(browserManageAddCookieFn).toHaveBeenCalledWith({ name: 'name', value: 'value' });
        });
    });
});
