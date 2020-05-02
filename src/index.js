const { Builder } = require('selenium-webdriver');

const login = require('./scraper/login');
const course = require('./scraper/course');

(async function main() {
  const driver = await new Builder()
    .forBrowser('chrome')
    .setProxy({
      proxyType: 'manual',
      socksProxy: '127.0.0.1:10808',
      socksVersion: 5,
    })
    .build();
  
  try {
    await login(driver);

    await course(driver);
  } finally {
    driver.quit();
  }
})();
