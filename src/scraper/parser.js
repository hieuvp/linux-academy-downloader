const xpath = require('xpath-html');

const get = require('lodash/get');
const isNil = require('lodash/isNil');

const Moment = require('moment');
const MomentRange = require('moment-range');

const moment = MomentRange.extendMoment(Moment);

/**
 * @param {string} html
 * @returns {Array}
 */
const parseCourse = (html) => {
  // The returned resources after parsing completely
  const resources = [];

  const document = xpath.fromPageSource(html);
  const course = document.findElement("//div[@class='course-title']/h1").getText().trim();

  const nodes = document.findElements("//div[@class='syllabus']/*");

  let sectionTitle;
  let sectionOrder = 0;

  let subsectionTitle;
  let subsectionOrder = 0;

  let lessonTitle;
  let lessonOrder = 0;

  nodes.forEach((node) => {
    switch (node.getTagName()) {
      case 'h3': {
        sectionOrder += 1;
        subsectionOrder = 0;
        lessonOrder = 0;

        sectionTitle = node.getText().trim();

        break;
      }

      case 'h4': {
        subsectionOrder += 1;
        lessonOrder = 0;

        subsectionTitle = xpath.fromNode(node).findElement('//span').getText().trim();

        break;
      }

      case 'a': {
        lessonOrder += 1;

        lessonTitle = xpath.fromNode(node).findElement('//h6').getText().trim();

        let lessonLink = node.getAttribute('href');
        let lessonType;

        switch (true) {
          case lessonLink.startsWith('https://app.linuxacademy.com/challenges/'): {
            lessonType = 'challenge';
            break;
          }

          case lessonLink.startsWith('https://app.linuxacademy.com/hands-on-labs/'): {
            lessonType = 'lab';
            break;
          }

          case lessonLink.startsWith('/cp/courses/lesson/course/'): {
            lessonLink = `https://linuxacademy.com${lessonLink}`;
            lessonType = 'video';
            break;
          }

          default:
            throw new Error(`Unparsable lesson with link ${lessonLink}`);
        }

        const resource = {
          course,
          sectionTitle,
          sectionOrder,
          subsectionTitle,
          subsectionOrder,
          lessonTitle,
          lessonOrder,
          lessonLink,
          lessonType,
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

/**
 * @param {Array} logs
 * @returns {string}
 */
const parseDownloadLink = (logs) => {
  const found = logs
    .map((entry) => {
      const { message } = JSON.parse(entry.message);

      const method = get(message, ['method']);
      const url = get(message, ['params', 'request', 'url']);

      return { method, url };
    })
    .find(
      (request) =>
        request.method === 'Network.requestWillBeSent' &&
        isNil(request.url) === false &&
        request.url.startsWith('https://video-cdn.linuxacademy.com/') &&
        request.url.includes('playlist.m3u8'),
    );

  return get(found, ['url']);
};

/**
 * @param {Array} logs
 * @param {number} fromTimestamp
 * @param {number} toTimestamp
 * @returns {Array}
 */
const filterLogsByTimeRange = (logs, fromTimestamp, toTimestamp) => {
  const range = moment().range(moment(fromTimestamp), moment(toTimestamp));

  return logs.filter(({ timestamp }) => range.contains(moment(timestamp)));
};

module.exports = {
  parseCourse,
  parseDownloadLink,

  filterLogsByTimeRange,
};
