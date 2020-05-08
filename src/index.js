const yaml = require('js-yaml');

const course = require('./scraper/course');
const lesson = require('./scraper/lesson');
const login = require('./scraper/login');

const getDriver = require('./scraper/driver');

(async function main() {
  const driver = await getDriver();

  try {
    await login();

    const resources = await course();

    const enhancedResources = [];

    // eslint-disable-next-line no-restricted-syntax
    for (const resource of resources) {
      const { link, type } = resource;

      switch (type) {
        case 'video': {
          // eslint-disable-next-line  no-await-in-loop
          const downloadLink = await lesson(link);

          enhancedResources.push({
            ...resource,
            downloadLink,
          });

          break;
        }

        case 'lab': {
          enhancedResources.push(resource);
          break;
        }

        case 'challenge': {
          enhancedResources.push(resource);
          break;
        }

        default:
          throw new Error(`Unsupported type ${type}`);
      }
    }

    console.log(yaml.safeDump(enhancedResources));
  } finally {
    await driver.quit();
  }
})();
