const { until } = require('selenium-webdriver');

async function waitUntilVisible(driver, locator, timeout = 10000) {
    await driver.wait(until.elementLocated(locator), timeout);
    const element = await driver.findElement(locator);
    await driver.wait(until.elementIsVisible(element), timeout);
    return element;
}

module.exports = {
    waitUntilVisible
};