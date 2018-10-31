import {$, browser, by, element} from 'protractor';

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
        return $("#item");
    }

    static get buttons() {
        return new PageButtons();
    }

    static async open(): Promise<any> {
        await browser.get('/index.html');
    }
}

export class PageButtons {
    get get() {
        return element(by.buttonText('get'));
    }

    get binary() {
        return element(by.buttonText('binary'));
    }

    get getAsJsonp() {
        return element(by.buttonText('get as jsonp'));
    }

    get post() {
        return element(by.buttonText('post'));
    }
}
