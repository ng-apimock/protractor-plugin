import * as path from 'path';

import {
    Before, Given, Then, When
} from 'cucumber';
import * as fs from 'fs-extra';
import { browser } from 'protractor';

import { PagePO } from '../pos/page.po';

const expect = require('jest-matchers');

const mocksDirectory = path.join(require.resolve('@ng-apimock/test-application'), '..', 'mocks');
let responses: any;

Before(async () => {
    // perform some shared setup
    responses = {
        getItems: fs.readJsonSync(path.join(mocksDirectory, 'get-items.mock.json')).responses,
        postItem: fs.readJsonSync(path.join(mocksDirectory, 'post-item.mock.json')).responses
    };

    responses.getItems['passThrough'] = { status: 200, data: ['passThrough'] };
    responses.postItem['passThrough'] = { status: 200, data: ['passThrough'] };
});

Given(/^I open the test page/, async () => {
    await PagePO.open();
});

When(/^I download the binary file$/, async () => {
    await PagePO.buttons.binary.click();
});
When(/^I enter (.*) and post the item$/, async (data: string) => {
    await PagePO.input.clear();
    await PagePO.input.sendKeys(data);
    await PagePO.buttons.post.click();
});
When(/^I get the items$/, async () => {
    await PagePO.buttons.get.click();
});
When(/^I get the items as jsonp$/, async () => {
    await PagePO.buttons.getAsJsonp.click();
});

Then(/^the items are fetched$/, async () => {
    await browser.waitForAngularEnabled(true);
    expect(await PagePO.done.getText()).toEqual('true');
});
Then(/^the items are not yet fetched$/, async () => {
    expect(await PagePO.done.getText()).toEqual('false');
});
Then(/^the response is interpolated with variable (.*)$/, async (variable: string) => {
    expect(await PagePO.data.getText()).toContain(variable);
});
Then(/^the (.*) response is returned for get items$/, async (scenario: string) => {
    if (responses.getItems[scenario].data !== undefined) {
        const data = await PagePO.data.getText();
        expect(JSON.parse(data)).toEqual(responses.getItems[scenario].data);
    }
    const status = await PagePO.status.getText();
    expect(parseInt(status)).toEqual(responses.getItems[scenario].status);
});
Then(/^the (.*) response is returned for post item$/, async (scenario: string) => {
    if (responses.postItem[scenario].data !== undefined) {
        const data = await PagePO.data.getText();
        expect(JSON.parse(data)).toEqual(responses.postItem[scenario].data);
    }
    const status = await PagePO.status.getText();
    expect(parseInt(status)).toEqual(responses.postItem[scenario].status);
});
Then(/^the (.*) response is downloaded$/, async (scenario: string) => {
    await browser.wait(() => {
        if (fs.existsSync(`${browser.params.default_directory}/test.pdf`)) {
            const actual = fs.readFileSync(`${browser.params.default_directory}/test.pdf`);
            const expected = fs.readFileSync(path.join(mocksDirectory, responses.getItems[scenario].file));
            return actual.equals(expected);
        }
        return browser.params.environment === 'CI';
    }, 5000);
});
