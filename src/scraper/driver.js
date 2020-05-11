const { Builder, logging } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

const config = require('./config');

let driver;

const getDriver = async () => {
  if (driver === undefined) {
    const options = new chrome.Options();

    const loggingPreferences = new logging.Preferences();
    loggingPreferences.setLevel(config.LOGGING_TYPE, config.LOGGING_LEVEL);
    options.setLoggingPrefs(loggingPreferences);

    options.setPerfLoggingPrefs({
      enableNetwork: true,
    });

    driver = await new Builder()
      .forBrowser('chrome')
      .setProxy({
        proxyType: 'manual',
        socksProxy: '127.0.0.1:10808',
        socksVersion: 5,
      })
      .setChromeOptions(options)
      .build();
  }

  return driver;
};

module.exports = getDriver;
