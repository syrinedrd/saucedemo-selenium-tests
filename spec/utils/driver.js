const { Builder } = require('selenium-webdriver');
const { Options } = require('selenium-webdriver/chrome');

function buildDriver() {
    const chromeOptions = new Options()
        .addArguments('--disable-blink-features=AutomationControlled')
        .excludeSwitches('enable-automation');

    chromeOptions.setUserPreferences({
        'profile.password_manager_enabled': false,
        'credentials_enable_service': false,
        'profile.password_manager_leak_detection': false
    });

    return new Builder().forBrowser('chrome').setChromeOptions(chromeOptions).build();
}

module.exports = { buildDriver };
