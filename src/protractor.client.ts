import {browser} from 'protractor';
import BaseClient from '@ng-apimock/base-client/dist';

/** Protractor client for ng-apimock. */
class ProtractorClient extends BaseClient {
    /** Constructor.*/
    constructor() {
        super(browser.baseUrl);
    }

    /** {@inheritDoc}. */
    async openUrl(url: string): Promise<any> {
        return await browser.driver.get(url);
    }

    /** {@inheritDoc}. */
    async setCookie(name: string, value: string): Promise<any> {
        return await (browser.manage() as any).addCookie({ name: name, value: value });
    }

    /**
     * Sets the variable. If the variable already exists, it will be overridden.
     * @param {string} key The key.
     * @param {string} value The value.
     * @return {Promise} promise The promise.
     * @deprecated use {@link setVariable}
     */
    async setGlobalVariable(key: string, value: string): Promise<any> {
        return await this.setVariable(key, value);
    }

    /**
     * Sets the variables. If the variable already exists, it will be overridden.
     * @param body The body.
     * @return {Promise} promise The promise.
     * @deprecated use {@link setVariables}
     */
    async setGlobalVariables(body: { [p: string]: string }): Promise<any> {
        return await this.setVariables(body);
    }

    /**
     * Removes the variable matching the given key.
     * @param {string} key The key.
     * @return {Promise} promise The promise.
     * @deprecated use {@link deleteVariable}
     */
    async deleteGlobalVariable(key: string): Promise<any> {
        return await this.deleteVariable(key);
    }

    /**
     * Sets for all the mocks the selected scenario back to the default.
     * @return {Promise} promise The promise.
     * @deprecated use {@link resetMocksToDefault}.
     */
    async setAllScenariosToDefault(): Promise<any> {
        return await this.resetMocksToDefault();
    }

    /**
     * Sets for all the mocks the selected scenario to the passThrough.
     * @return {Promise} promise The promise.
     * @deprecated use {@link setMocksToPassThrough
     */
    async setAllScenariosToPassThrough(): Promise<any> {
        return await this.setMocksToPassThrough();
    }
}

export default ProtractorClient;