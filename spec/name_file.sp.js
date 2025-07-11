const selenium  = require('selenium-webdriver');
const { By, Key, until } = selenium;
const { Options } = require('selenium-webdriver/chrome');
jasmine.getEnv().defaultTimeoutInterval = 60000;
describe('selenium', function () {
    let driver;
    beforeEach(async function () {
        const chromeOptions = new Options()
            .addArguments('--disable-blink-features=AutomationControlled')
            .excludeSwitches('enable-automation');

        driver = new selenium.Builder()
            .forBrowser('chrome')
            .setChromeOptions(chromeOptions)
            .build();

        await driver.get('http://www.google.com/');
    });
    afterEach(async function(){
        await driver.quit();
    });
    it('should search successfully', async function () {
        const varBox= await driver.findElement(By.name('q'));
        await varBox.sendKeys('Selenium WebDriver', Key.RETURN);
        await driver.wait(until.titleContains('Selenium WebDriver'), 10000);
        const title = await driver.getTitle();
        expect(title).toContain('Selenium WebDriver');
    });
    
    
});
