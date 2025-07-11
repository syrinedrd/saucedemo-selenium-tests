const { By, until } = require('selenium-webdriver');

async function login(driver, username = 'standard_user', password = 'secret_sauce') {
    await driver.findElement(By.id('user-name')).sendKeys(username);
    await driver.findElement(By.id('password')).sendKeys(password);
    await driver.findElement(By.id('login-button')).click();
    await driver.wait(until.urlContains('inventory'), 10000);
}

module.exports = {
    login
};