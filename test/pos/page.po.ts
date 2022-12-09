import {
    $, browser, by, element, ElementFinder, protractor
} from 'protractor';

export interface Repository {
    name: string;
    url: string;
    description: string;
    license: string;
}

export class PagePO {
    static get repositories() {
        return $('.repositories');
    }

    static get repositoryData() {
        return this.repositories
            .all(by.tagName('mat-row'))
            .map(async (el: ElementFinder) => ({
                name: await el.$('.mat-column-name').getText(),
                url: await el.$('.mat-column-html_url').getText(),
                description: await el.$('.mat-column-description').getText(),
                license: await el.$('.mat-column-license').getText(),
            } as Repository));
    }

    static get repositoryName() {
        return $('input[formcontrolname=\'name\']');
    }

    static get repositoryDescription() {
        return $('input[formcontrolname=\'description\']');
    }

    static get createRepository() {
        return element(by.buttonText('Submit'));
    }

    static async downloadReadmeForRepository(name: string): Promise<any> {
        const repository = this.repositories
            .all(by.tagName('mat-row'))
            .filter(async (el: ElementFinder) => {
                const text = await el.$('.mat-column-name').getText();
                return text === name;
            }).get(0);

        repository.element(by.buttonText('Download readme')).click();
    }

    static async waitForRepositoriesPresent(): Promise<any> {
        const until = protractor.ExpectedConditions;
        await browser.wait(until.visibilityOf($('.repositories')), 5000, 'repositories not visible');
    }

    static navigate(destination = '/index.html') {
        return browser.get(destination);
    }

    static refresh() {
        return element(by.buttonText('Refresh')).click();
    }

    static error() {
        return $('.mat-mdc-dialog-title');
    }
}
