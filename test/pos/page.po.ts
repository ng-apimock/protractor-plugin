import { $, browser } from 'protractor';

import { PageButtons } from './page-buttons.po';

export class PagePO {
    static get data() {
        return $('.data');
    }

    static get status() {
        return $('.status');
    }

    static get done() {
        return $('.done');
    }

    static get input() {
        return $('#item');
    }

    static get buttons() {
        return new PageButtons();
    }

    static async open(): Promise<any> {
        await browser.get('/index.html');
    }
}
