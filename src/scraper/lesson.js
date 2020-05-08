const { By, until, logging } = require('selenium-webdriver');

const { config } = require('./driver');

module.exports = async (driver, url) => {
  await driver.get(url);

  await driver.wait(
    until.elementLocated(
      By.xpath("//video[starts-with(@src, 'blob:https://linuxacademy.com/')]"),
    ),
    config.timeout,
  );

  const logs = await driver.manage().logs().get(logging.Type.PERFORMANCE);
  console.log(JSON.stringify(logs));
};
