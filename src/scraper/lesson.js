const { By, until, logging } = require('selenium-webdriver');
const get = require('lodash/get');
const isNil = require('lodash/isNil');

const { timeout } = require('./config');

const parseNetworkRequest = (logEntry) => {
  const { message } = JSON.parse(logEntry.message);

  const method = get(message, ['method']);
  const url = get(message, ['params', 'request', 'url']);

  return { method, url };
};

module.exports = async (driver, url) => {
  await driver.get(url);

  await driver.wait(until.elementLocated(By.xpath('//video[starts-with(@src, \'blob:https://linuxacademy.com/\')]')), timeout);

  const entries = await driver.manage().logs().get(logging.Type.PERFORMANCE);
  const found = entries.map(entry => parseNetworkRequest(entry))
    .find(request => (
      request.method === 'Network.requestWillBeSent'
        && isNil(request.url) === false
        && request.url.startsWith('https://video-cdn.linuxacademy.com/')
        && request.url.includes('playlist.m3u8')
    ));

  // console.log('found =', get(found, ['url']));

  console.log(JSON.stringify(entries));
};
