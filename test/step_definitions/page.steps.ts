import * as path from 'path';

import {
    Before, Given, Then, When
} from 'cucumber';
import * as fs from 'fs-extra';
import {
    $, browser, protractor
} from 'protractor';

import { PagePO, Repository } from '../pos/page.po';

const expect = require('jest-matchers');

const mocksDirectory = path.join(require.resolve('@ng-apimock/test-application'), '..', 'mocks');
let responses: any;

Before(async () => {
    // perform some shared setup
    responses = {
        getRepos: fs.readJsonSync(path.join(mocksDirectory, 'get-repos.mock.json')).responses,
        createRepo: fs.readJsonSync(path.join(mocksDirectory, 'create-repo.mock.json')).responses,
        readme: fs.readJsonSync(path.join(mocksDirectory, 'readme.mock.json')).responses
    };

    responses.getRepos['passThrough'] = { status: 200, data: ['passThrough'] };
    responses.createRepo['passThrough'] = { status: 200, data: ['passThrough'] };
    responses.readme['passThrough'] = { status: 200, data: ['passThrough'] };
});

Given(/^I open the page/, async () => {
    await PagePO.navigate();
});

Given(/^I refresh/, async () => {
    await $('body').sendKeys(protractor.Key.ESCAPE);
    await PagePO.refresh();
});

Given(/^I try to create a repository/, async () => {
    await PagePO.navigate('/#/repos;action=new');
    await PagePO.repositoryName.clear();
    await PagePO.repositoryName.sendKeys('some-awesome-plugin');
    await PagePO.repositoryDescription.sendKeys('Some awesome plugin');
    await PagePO.createRepository.click();
});

When(/^I download the readme for the repository (.*)$/, async (repository: string) => {
    await PagePO.downloadReadmeForRepository(repository);
});

Then(/^the following repositories are shown:$/, async (dataTable: { rows: Function }) => {
    PagePO.waitForRepositoriesPresent();

    const repositories = await PagePO.repositoryData;
    dataTable.rows()
        .forEach((row: any) => {
            expect(repositories
                .filter((repository: Repository) => repository.name === row[0]).length === 1)
                .toBeTruthy();
            if (row[1]) {
                expect(repositories
                    .filter((repository: Repository) => repository.description === row[1]).length === 1)
                    .toBeTruthy();
            }
        });
});

Then(/^the repository is added$/, async () => {
    const addedRepositoryName = 'some-awesome-plugin';
    const repositories = await PagePO.repositoryData;
    expect(repositories
        .filter((repository: Repository) => repository.name === addedRepositoryName).length === 1)
        .toBeTruthy();
});

When(/^An error with message (.*) has occured$/, async (message: string) => {
    const until = protractor.ExpectedConditions;
    await browser.wait(until.visibilityOf(PagePO.error()), 5000, 'dialog not visible');
    expect(await PagePO.error().getText()).toEqual(message);
});

Then(/^the repositories are fetched$/, async () => {
    await browser.waitForAngularEnabled(true);
    expect(await PagePO.repositories.isPresent()).toBeTruthy();
});

Then(/^the repositories are not yet fetched$/, async () => {
    expect(await PagePO.repositories.isPresent()).toBeFalsy();
});

Then(/^the README is downloaded$/, async () => {
    await browser.wait(() => {
        if (fs.existsSync(`${browser.params.default_directory}/README.md`)) {
            const actual = fs.readFileSync(`${browser.params.default_directory}/README.md`);
            const expected = fs.readFileSync(path.join(mocksDirectory, 'README.md'));
            return actual.equals(expected);
        }
        return browser.params.environment === 'CI';
    }, 5000);
});
