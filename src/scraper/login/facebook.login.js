const { By, until } = require('selenium-webdriver');
const getDriver = require('../driver');
const config = require('../config');

module.exports = async () => {
  const driver = await getDriver();

  await driver.get('https://linuxacademy.com/');

  await driver.findElement(By.partialLinkText('Log In')).click();

  await driver.wait(
    until.elementLocated(By.partialLinkText('Sign in with Facebook')),
    config.WAIT_TIMEOUT,
  );
  await driver.findElement(By.partialLinkText('Sign in with Facebook')).click();

  await driver.findElement(By.id('email')).sendKeys(process.env.FACEBOOK_USERNAME);
  await driver.findElement(By.id('pass')).sendKeys(process.env.FACEBOOK_PASSWORD);
  await driver.findElement(By.id('loginbutton')).click();

  await driver.wait(
    until.urlContains('https://linuxacademy.com/cp/ssologin'),
    config.WAIT_TIMEOUT,
  );

  await driver.wait(until.elementLocated(By.partialLinkText('Home')), config.WAIT_TIMEOUT);
  await driver.findElement(By.partialLinkText('Home')).click();
};
