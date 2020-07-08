import { BaseClient, Configuration } from '@ng-apimock/base-client';
import { browser } from 'protractor';

/** Protractor plugin for ng-apimock. */
export class ProtractorPlugin extends BaseClient {
    /** Constructor. */
    constructor(configuration: Configuration) {
        super(configuration);
    }

    /** {@inheritDoc}. */
    async openUrl(url: string): Promise<any> {
        return await browser.driver.get(url);
    }

    /** {@inheritDoc}. */
    async setCookie(name: string, value: string): Promise<any> {
        return await (browser.manage() as any).addCookie({ name, value });
    }
}
