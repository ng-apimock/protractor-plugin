import { Client } from '@ng-apimock/base-client';
import { browser } from 'protractor';

import { ProtractorPlugin } from './protractor.plugin';

let plugin: ProtractorPlugin;

/**
 * On prepare.
 * @return {Promise<void>} promise The promise.
 */
async function onPrepare() {
    const globalName = (this.config.options && this.config.options.globalName)
        ? this.config.options.globalName
        : 'ngApimock';

    (global as any)[globalName] = plugin;
}

/**
 * Setup.
 * @return {Promise<void>} promise The promise.
 */
async function setup() {
    plugin = new ProtractorPlugin({
        baseUrl: (this.config.options && this.config.options.baseUrl)
            ? this.config.options.baseUrl
            : browser.baseUrl,
        basePath: (this.config.options && this.config.options.basePath)
            ? this.config.options.basePath
            : undefined
    });
    await plugin.setNgApimockCookie();
}

exports.onPrepare = onPrepare;
exports.setup = setup;

export { Client };
