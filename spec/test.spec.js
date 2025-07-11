jasmine.DEFAULT_TIMEOUT_INTERVAL = 60000;

const { buildDriver } = require('./utils/driver');
const { login } = require('./utils/login');
const { navigateTo } = require('./utils/navigateTo');

describe('SauceDemo Tests - Reusable Structure', function () {
    let driver;

    beforeEach(async function () {
        driver = await buildDriver();
        await navigateTo(driver, "http://jaipur.dlf.local/tms-val");
    });

    afterEach(async function () {
        if (driver) {
            await driver.quit();
        }
    });

    it('should login successfully', async function () {
        await login(driver, "ADMIN", "1234", "Frensh");
        await driver.sleep(5000)
    });
});
