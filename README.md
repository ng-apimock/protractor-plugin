# ng-apimock/protractor-plugin [![npm](https://img.shields.io/npm/v/@ng-apimock/protractor-plugin?color=brightgreen)](https://www.npmjs.com/package/@ng-apimock/protractor-plugin) [![Build Status](https://github.com/ng-apimock/protractor-plugin/workflows/CI/badge.svg)](https://github.com/ng-apimock/protractor-plugin/actions?workflow=CI) [![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=ng-apimock_protractor-plugin&metric=alert_status)](https://sonarcloud.io/dashboard?id=ng-apimock_protractor-plugin) [![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/) [![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-brightgreen.svg)](https://github.com/semantic-release/semantic-release) [![Dependabot Status](https://api.dependabot.com/badges/status?host=github&repo=ng-apimock/protractor-plugin)](https://dependabot.com) [![dependency Status](https://img.shields.io/david/ng-apimock/protractor-plugin.svg)](https://david-dm.org/ng-apimock/protractor-plugin) [![devDependency Status](https://img.shields.io/david/dev/ng-apimock/protractor-plugin.svg)](https://david-dm.org/ng-apimock/protractor-plugin#info=devDependencies) ![npm downloads](https://img.shields.io/npm/dm/@ng-apimock/protractor-plugin)
protractor plugin for @ng-apimock/core 

## Getting Started

```shell
npm install @ng-apimock/protractor-plugin --save-dev
```

### Usage
This plugin connects to ng-apimock and makes the plugin functions available within the tests.

Enable this plugin in your config file:

```js
exports.config = {
    plugins: [{
        package: '@ng-apimock/protractor-plugin',
        options: {
            globalName: 'ngApimock' // optional option (defaults to ngApimock)
        }
    }]
};
```

After registering the plugin, you can use it in your tests by calling it like this:

```js
describe('Some test', () => {
    it('does something', async () => 
        await ngApimock.selectScenario('my-mock-name', 'some-scenario'));
});
```

### Available plugin functions
The following functions are available. Each plugin function returns a promise.

##### selectScenario(name: string, scenario: string): Promise<any>;
Selects the given scenario (when calling this function without a scenario or with 'passThrough' as scenario name, the call will be passed through to the actual backend).

##### delayResponse(mockName: string, delay: number): Promise<any>;
Sets the delay time in milliseconds for the mock. This makes sure the response is delayed. The delay set here overrides the delay defined in the response mock.

##### echoRequest(name: string, echo: boolean): Promise<any>; 
Sets the indicator which enables / disables the request logging.

##### setVariable(key: string, value: any): Promise<any>;
Adds or updates the global variable.
    
##### setVariables(variables: {[key: string]: any;}): Promise<any>;
Adds or updates the global variables  ie. {'some':'value', 'another': 'value'}.
    
##### deleteVariable(key: string): Promise<any>;
Deletes the global variable.

##### resetMocksToDefault(): Promise<any>;
Resets all the mocks to the default state.

##### setMocksToPassThrough(): Promise<any>;
Sets all the mocks to pass through.

##### selectPreset(name: string): Promise<any>;
Selects the mocks and variables in the selected state.
