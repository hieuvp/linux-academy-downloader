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

    await resources.reduce(async (promise, resource) => {
      await promise;

      const { link, type } = resource;

      switch (type) {
        case 'video': {
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
    }, Promise.resolve());

    console.log(yaml.safeDump(enhancedResources));
  } finally {
    await driver.quit();
  }
})();
