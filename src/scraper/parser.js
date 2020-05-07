const xpath = require('xpath-html');

const get = require('lodash/get');
const isNil = require('lodash/isNil');

/**
 * @param {string} html
 * @returns {Array}
 */
const parseCourse = (html) => {
  const resources = [];

  const document = xpath.fromPageSource(html);
  const course = document.findElement("//div[@class='course-title']/h1").getText();
  const nodes = document.findElements("//div[@class='syllabus']/*");

  let section;
  let subsection;

  nodes.forEach((node) => {
    switch (node.getTagName()) {
      case 'h3': {
        section = node.getText().trim();
        break;
      }

      case 'h4': {
        subsection = xpath.fromNode(node).findElement('//span').getText();
        break;
      }

      case 'a': {
        let link = node.getAttribute('href');
        let type;

        switch (true) {
          case link.startsWith('https://app.linuxacademy.com/challenges/'): {
            type = 'challenge';
            break;
          }

          case link.startsWith('https://app.linuxacademy.com/hands-on-labs/'): {
            type = 'lab';
            break;
          }

          case link.startsWith('/cp/courses/lesson/course/'): {
            link = `https://linuxacademy.com${link}`;
            type = 'video';
            break;
          }

          default:
            throw new Error(`Unsupported link ${node.toString()}`);
        }

        const lesson = xpath.fromNode(node).findElement('//h6').getText();

        const resource = {
          course,
          section,
          subsection,
          lesson,
          link,
          type,
        };

        resources.push(resource);

        break;
      }

      default:
        throw new Error(`Unsupported TagName ${node.toString()}`);
    }
  });

  return resources;
};

const parseNetworkRequest = (logEntry) => {
  const { message } = JSON.parse(logEntry.message);

  const method = get(message, ['method']);
  const url = get(message, ['params', 'request', 'url']);

  return { method, url };
};

/**
 * @param {Array} logs
 * @returns {string}
 */
const parseDownloadLink = (logs) => {
  const found = logs
    .map((entry) => parseNetworkRequest(entry))
    .find(
      (request) =>
        request.method === 'Network.requestWillBeSent' &&
        isNil(request.url) === false &&
        request.url.startsWith('https://video-cdn.linuxacademy.com/') &&
        request.url.includes('playlist.m3u8'),
    );

  return get(found, ['url']);
};

module.exports = {
  parseCourse,
  parseDownloadLink,
};
