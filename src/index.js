const course = require('./scraper/course');
const lesson = require('./scraper/lesson');
const login = require('./scraper/login');

const getDriver = require('./scraper/driver');

(async function main() {
  const driver = await getDriver();

  try {
    await login();

    const resources = await course();

    for (const { link, type } of resources) {
      if (type === 'video') {
        await lesson(link);
      }
    }
  } finally {
    await driver.quit();
  }
}());
