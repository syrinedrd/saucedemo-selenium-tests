async function navigateTo(driver, url) {
    await driver.get(url);
}

module.exports = {navigateTo}