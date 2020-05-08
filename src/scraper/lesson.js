const { By, until, logging } = require('selenium-webdriver');

const { timeout } = require('./config');

module.exports = async (driver, url) => {
  await driver.get(url);

  await driver.wait(
    until.elementLocated(
      By.xpath("//video[starts-with(@src, 'blob:https://linuxacademy.com/')]"),
    ),
    timeout,
  );

  const logs = await driver.manage().logs().get(logging.Type.PERFORMANCE);
  console.log(JSON.stringify(logs));
};
