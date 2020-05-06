const { By, until } = require('selenium-webdriver');

const { timeout } = require('./config');

module.exports = async (driver) => {
  const url = process.argv[2];
  await driver.get(url);

  await driver.wait(until.elementLocated(By.xpath("//div[@class='syllabus']/h3")), timeout);
  const pageSource = await driver.getPageSource();

  console.log(pageSource);
};
