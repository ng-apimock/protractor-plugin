const path = require('path');

exports.config = {
    allScriptsTimeout: 5000,
    baseUrl: 'http://localhost:9900/',
    params: {
        default_directory: '/tmp'
    },
    specs: [
        'features/*.feature'
    ],
    plugins: [{
        path: path.join(process.cwd(), 'dist', 'index.js'),
        options: {
            globalName: 'client'
        }
    }],
    onPrepare: async () => {
        const chai = require('chai');
        global.chai = chai;
        global.expect = chai.expect;
        await browser.getProcessedConfig().then(async () =>
            await browser.driver.manage().window().maximize());
    },
    SELENIUM_PROMISE_MANAGER: true,
    framework: 'custom',
    frameworkPath: require.resolve('protractor-cucumber-framework'),
    cucumberOpts: {
        require: './step_definitions/*.steps.js',
        format: 'summary'
    }
};
