const { By, until } = require('selenium-webdriver');
const moment = require('moment');

const getDriver = require('./driver');
const { filterLogsByTimeRange, parseDownloadLink } = require('./parser');

const config = require('./config');

module.exports = async (url) => {
  const start = moment().valueOf();

  const driver = await getDriver();
  await driver.get(url);

  await driver.wait(
    until.elementLocated(
      By.xpath('//video[starts-with(@src, \'blob:https://linuxacademy.com/\')]'),
    ),
    config.WAIT_TIMEOUT,
  );

  const end = moment().valueOf();

  let logs = await driver.manage().logs().get(config.LOGGING_TYPE);
  logs = filterLogsByTimeRange(logs, start, end);

  const downloadLink = parseDownloadLink(logs);
  console.log('downloadLink =', downloadLink);

};
