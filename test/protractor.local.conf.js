const config = require('./protractor.conf').config;
let server;

config.multiCapabilities = [{
    browserName: 'chrome',
    maxInstances: 1,
    shardTestFiles: false,
    chromeOptions: {
        args: ['--no-sandbox', '--test-type=browser'],
        prefs: {
            'download': {
                'prompt_for_download': false,
                'directory_upgrade': true,
                'default_directory': '/tmp'
            }
        }
    }
}];

config.seleniumAddress = 'http://localhost:4444/wd/hub';

config.beforeLaunch = () => {
    const child_process = require('child_process');
    const path = require('path');
    server = child_process.spawn('node',
        [path.join(__dirname, 'server.js')],
        {cwd: __dirname, stdio: 'inherit'});
    process.on('exit', () => server.kill());
};

config.afterLaunch = () => {
    server.kill();
};

exports.config = config;

