import ProtractorPlugin from './protractor.plugin';

let client: ProtractorPlugin;

/**
 * On prepare.
 * @return {Promise<void>} promise The promise.
 */
async function onPrepare() {
    const globalName = this.config.options.globalName || 'ngApimock';
    (global as any)[globalName] = client;
}

/**
 * Setup.
 * @return {Promise<void>} promise The promise.
 */
async function setup() {
    client = new ProtractorPlugin(this.config.options.baseUrl);
    await client.setNgApimockCookie();
}

exports.onPrepare = onPrepare;
exports.setup = setup;
