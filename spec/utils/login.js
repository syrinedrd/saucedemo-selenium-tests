const { By, until } = require('selenium-webdriver');
const { waitUntilVisible } = require('./waitUntilVisible');

async function login(driver, username, password, language) {

    const unameLocator = By.id('uname');
    const unameInput = await waitUntilVisible(driver, unameLocator);
    await unameInput.sendKeys(username);

    const pwdLocator = By.id('pwd');
    const pwdInput = await waitUntilVisible(driver, pwdLocator);
    await pwdInput.sendKeys(password);

    // if (language) {
    //     await driver.findElement(By.id('language')).sendKeys(language);
    // }

    const connectLocator = By.id('connect');
    const connectButton = await waitUntilVisible(driver, connectLocator);
    await connectButton.click();

}

module.exports = {
    login
};
