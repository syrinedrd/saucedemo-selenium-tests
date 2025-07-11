jasmine.DEFAULT_TIMEOUT_INTERVAL = 60000;

const selenium = require('selenium-webdriver');
const { By, until } = selenium;
const { Options } = require('selenium-webdriver/chrome');

describe('SauceDemo Tests - étapes séparées', function () {
    let driver;

    beforeEach(async function () {
        const chromeOptions = new Options()
            .addArguments('--disable-blink-features=AutomationControlled')
            .excludeSwitches('enable-automation');

        chromeOptions.setUserPreferences({
            'profile.password_manager_enabled': false,
            'credentials_enable_service': false,
            'profile.password_manager_leak_detection': false
        });

        driver = await new selenium.Builder()
            .forBrowser('chrome')
            .setChromeOptions(chromeOptions)
            .build();

        await driver.get('https://www.saucedemo.com/');
    });

    afterEach(async function () {
        if (driver) {
            await driver.quit();
        }
    });

    it('should login successfully', async function () {
        const start = Date.now();
        await login();

        const currentUrl = await driver.getCurrentUrl();
        expect(currentUrl).toContain('inventory');
    });

    it('should add product and check in cart', async function () {
        await login();

        let start = Date.now();
        await addProduct('Sauce Labs Bolt T-Shirt');

        start = Date.now();
        await goToCart();

        const cartItemText = await getCartItemText('Sauce Labs Bolt T-Shirt');
        expect(cartItemText).toBe('Sauce Labs Bolt T-Shirt');
    });

    it('should proceed to checkout and fill user info', async function () {
        await login();
        await addProduct('Sauce Labs Bolt T-Shirt');
        await goToCart();

        let start = Date.now();
        await proceedToCheckout();

        start = Date.now();
        await fillUserInfo('syrine', 'Dridi', '12345');

        start = Date.now();
        await continueCheckout();

        const currentUrl = await driver.getCurrentUrl();
        expect(currentUrl).toContain('checkout-step-two');
    });

    it('should finalize order and verify confirmation message', async function () {
        await login();
        await addProduct('Sauce Labs Bolt T-Shirt');
        await goToCart();
        await proceedToCheckout();
        await fillUserInfo('syrine', 'Dridi', '12345');
        await continueCheckout();

        const start = Date.now();
        await finishCheckout();

        const confirmationMsg = await driver.findElement(By.className('complete-header'));
        const confirmationText = await confirmationMsg.getText();
        expect(confirmationText.toUpperCase()).toContain('THANK YOU FOR YOUR ORDER');
    });

    async function login() {
        await driver.findElement(By.id('user-name')).sendKeys('standard_user');
        await driver.findElement(By.id('password')).sendKeys('secret_sauce');
        await driver.findElement(By.id('login-button')).click();
        await driver.wait(until.urlContains('inventory'), 10000);
    }

    async function addProduct(productName) {
        const productAddBtn = await driver.findElement(
            By.xpath(`//div[text()='${productName}']/ancestor::div[@class='inventory_item']//button`)
        );
        await productAddBtn.click();
    }

    async function goToCart() {
        const cartLink = await driver.findElement(By.className('shopping_cart_link'));
        await cartLink.click();
        await driver.wait(until.urlContains('cart'), 10000);
    }

    async function getCartItemText(productName) {
        const cartItem = await driver.findElement(
            By.xpath(`//div[@class='inventory_item_name' and text()='${productName}']`)
        );
        return await cartItem.getText();
    }

    async function proceedToCheckout() {
        const checkoutBtn = await driver.findElement(By.id('checkout'));
        await checkoutBtn.click();
        await driver.wait(until.urlContains('checkout-step-one'), 10000);
    }

    async function fillUserInfo(firstName, lastName, postalCode) {
        await driver.findElement(By.id('first-name')).sendKeys(firstName);
        await driver.findElement(By.id('last-name')).sendKeys(lastName);
        await driver.findElement(By.id('postal-code')).sendKeys(postalCode);
    }

    async function continueCheckout() {
        const continueBtn = await driver.findElement(By.id('continue'));
        await continueBtn.click();
        await driver.wait(until.urlContains('checkout-step-two'), 10000);
    }

    async function finishCheckout() {
        const finishBtn = await driver.findElement(By.id('finish'));
        await finishBtn.click();
        await driver.wait(until.urlContains('checkout-complete'), 10000);
    }
});
