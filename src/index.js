const { Builder, logging } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

const login = require('./scraper/login');
// const course = require('./scraper/course');
const lesson = require('./scraper/lesson');

(async function main() {
  const options = new chrome.Options();

  const loggingPreferences = new logging.Preferences();
  loggingPreferences.setLevel(logging.Type.PERFORMANCE, logging.Level.ALL);
  options.setLoggingPrefs(loggingPreferences);

  options.setPerfLoggingPrefs({
    enableNetwork: true,
  });

  const driver = await new Builder()
    .forBrowser('chrome')
    .setProxy({
      proxyType: 'manual',
      socksProxy: '127.0.0.1:10808',
      socksVersion: 5,
    })
    .setChromeOptions(options)
    .build();

  try {
    await login(driver);

    // await course(driver);

    await lesson(driver, 'https://linuxacademy.com/cp/courses/lesson/course/2763/lesson/3');
  } finally {
    // driver.quit();
  }
})();
