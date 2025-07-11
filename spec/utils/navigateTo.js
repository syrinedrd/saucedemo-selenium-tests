async function navigateTo(driver, url) {
    await driver.get(url);
    const currentUrl = await driver.getCurrentUrl();
    expect(currentUrl).toContain(url);
}

module.exports = {navigateTo}