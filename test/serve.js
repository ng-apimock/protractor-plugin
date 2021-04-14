const path = require('path');

const apimock = require('@ng-apimock/core');
const connect = require('connect');
const { createProxyMiddleware } = require('http-proxy-middleware');
const serveStatic = require('serve-static');

const app = connect();
const mocksDirectory = path.join(require.resolve('@ng-apimock/test-application'), '..', 'mocks');

apimock.processor.process({ src: mocksDirectory });
app.use(apimock.middleware);
app.use('/', serveStatic(path.join(require('@ng-apimock/test-application'))));

app.use('/orgs/ng-apimock', createProxyMiddleware({
    target: 'https://api.github.com',
    changeOrigin: true,
    timeout: 5000,
}));

app.use('/ng-apimock', createProxyMiddleware({
    target: 'https://raw.githubusercontent.com',
    changeOrigin: true
}));

app.listen(9999);
console.log('ng-apimock-angular-test-app is running on port 9999');
