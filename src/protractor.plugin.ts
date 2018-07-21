import {browser} from 'protractor';
import BaseClient from '@ng-apimock/base-client';

/** Protractor plugin for ng-apimock. */
class ProtractorPlugin extends BaseClient {
    /** Constructor.*/
    constructor(baseUrl?: string) {
        super(baseUrl || browser.baseUrl);
    }

    /** {@inheritDoc}. */
    async openUrl(url: string): Promise<any> {
        return await browser.driver.get(url);
    }

    /** {@inheritDoc}. */
    async setCookie(name: string, value: string): Promise<any> {
        return await (browser.manage() as any).addCookie({ name: name, value: value });
    }
}

export default ProtractorPlugin;
