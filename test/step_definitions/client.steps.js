(() => {
    const {Given, When, After} = require('cucumber');
    
    Given(/^the following mock state$/, checkMockState);

    When(/^I add variable (.*) with value (.*)/, addVariable);
    When(/^I delete variable (.*)/, deleteVariable);
    When(/^I reset the mocks to default$/, resetMocksToDefault);
    When(/^I select scenario (.*) for mock (.*)$/, selectScenario);
    When(/^I set delay to (\d+) for mock (.*)$/, delayResponse);
    When(/^I set the mocks to passThroughs$/, setMocksToPassThrough);
    When(/^I update variable (.*) with value (.*)/, updateVariable);
    When(/^I wait a (\d+) milliseconds$/, waitSeconds);

    After(async () => await client.resetMocksToDefault());

    async function addVariable(key, value) {
        await client.setVariable(key, value);
    }

    async function checkMockState(dataTable) {
        const mocks = await client.getMocks();
        dataTable.rows()
            .forEach((row) => expect(mocks.state[row[0]].scenario).to.equal(row[1]));
    }

    async function delayResponse(delay, name) {
        browser.ignoreSynchronization = true;
        await client.delayResponse(name, parseInt(delay))
    }

    async function deleteVariable(key) {
        await client.deleteVariable(key);
    }

    async function selectScenario(scenario, name) {
        await client.selectScenario(name, scenario);
    }

    async function resetMocksToDefault() {
        await client.resetMocksToDefault();
    }

    async function setMocksToPassThrough() {
        await client.setMocksToPassThrough();
    }

    async function updateVariable(key, value) {
        await client.setVariable(key, value);
    }

    async function waitSeconds(wait) {
        await browser.sleep(wait)
    }
})();