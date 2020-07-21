const { By, until } = require('selenium-webdriver');

const getDriver = require('./driver');
const config = require('./config');

const { parseCourse } = require('./parser');

module.exports = async () => {
  const url = process.argv[2];

  const driver = await getDriver();
  await driver.get(url);

  await driver.wait(
    until.elementLocated(By.xpath("//div[@class='syllabus']/h3")),
    config.WAIT_TIMEOUT,
  );

  const pageSource = await driver.getPageSource();

  return parseCourse(pageSource);
};
