import { by, element } from 'protractor';

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
