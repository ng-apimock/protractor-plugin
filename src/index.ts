import ProtractorClient from './protractor.client';

module.exports = (async () => {
    const client = new ProtractorClient();
    return client.setNgApimockCookie();
})();