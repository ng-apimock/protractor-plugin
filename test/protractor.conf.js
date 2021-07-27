const path = require('path');

let server;

exports.config = {
    allScriptsTimeout: 5000,
    baseUrl: 'http://127.0.0.1:9999/',
    params: {
        default_directory: '/tmp'
    },
    specs: [
        path.join(__dirname, 'features', '**', '*.feature')
    ],
    plugins: [{
        path: path.join(process.cwd(), 'dist', 'index.js'),
        options: {
            globalName: 'client'
        }
    }],
    beforeLaunch: () => {
        const childProcess = require('child_process');
        server = childProcess.spawn('node',
            [path.join(__dirname, 'serve.js')],
            {
                cwd: __dirname,
                stdio: 'inherit'
            });
        process.on('exit', () => server.kill());
    },
    afterLaunch: () => {
        server.kill();
    },
    SELENIUM_PROMISE_MANAGER: true,
    framework: 'custom',
    frameworkPath: require.resolve('protractor-cucumber-framework'),
    cucumberOpts: {
        compiler: require('ts-node').register({}),
        require: [
            path.join(__dirname, 'step_definitions', '*.steps.ts'),
            path.join(__dirname, 'cucumber.helper.ts')
        ],
        format: ['summary']
    }
};
