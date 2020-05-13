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

      const { lessonLink, lessonType } = resource;

      switch (lessonType) {
        case 'video': {
          const downloadLink = await lesson(lessonLink);

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
          throw new Error(`Unsupported type ${lessonType}`);
      }
    }, Promise.resolve());

    console.log(yaml.safeDump(enhancedResources));
  } finally {
    await driver.quit();
  }
})();
