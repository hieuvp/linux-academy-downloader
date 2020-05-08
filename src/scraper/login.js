const { By, until } = require('selenium-webdriver');
const { config } = require('./driver');

module.exports = async (driver) => {
  await driver.get('https://linuxacademy.com/');

  await driver.findElement(By.partialLinkText('Log In')).click();

  await driver.wait(
    until.elementLocated(By.partialLinkText('Sign in with Facebook')),
    config.timeout,
  );
  await driver.findElement(By.partialLinkText('Sign in with Facebook')).click();

  await driver.findElement(By.id('email')).sendKeys(process.env.FACEBOOK_USERNAME);
  await driver.findElement(By.id('pass')).sendKeys(process.env.FACEBOOK_PASSWORD);
  await driver.findElement(By.id('loginbutton')).click();

  await driver.wait(until.urlContains('https://linuxacademy.com/cp/ssologin'), config.timeout);
  await driver.wait(until.elementLocated(By.partialLinkText('Home')), config.timeout);
  await driver.findElement(By.partialLinkText('Home')).click();
};
