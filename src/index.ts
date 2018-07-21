import ProtractorPlugin from './protractor.plugin';

let plugin: ProtractorPlugin;

/**
 * On prepare.
 * @return {Promise<void>} promise The promise.
 */
async function onPrepare() {
    const globalName = this.config.options.globalName || 'ngApimock';
    (global as any)[globalName] = plugin;
}

/**
 * Setup.
 * @return {Promise<void>} promise The promise.
 */
async function setup() {
    plugin = new ProtractorPlugin(this.config.options.baseUrl);
    await plugin.setNgApimockCookie();
}

exports.onPrepare = onPrepare;
exports.setup = setup;
