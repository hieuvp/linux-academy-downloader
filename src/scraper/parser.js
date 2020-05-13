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
<<<<<<< HEAD
  const resources = [];

  const document = xpath.fromPageSource(html);
  const course = document.findElement("//div[@class='course-title']/h1").getText();
  const nodes = document.findElements("//div[@class='syllabus']/*");

  let section;
  let sectionOrder = 0;

  let subsection;
  let subsectionOrder = 0;

=======
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
>>>>>>> master
  let lessonOrder = 0;

  nodes.forEach((node) => {
    switch (node.getTagName()) {
      case 'h3': {
        sectionOrder += 1;
        subsectionOrder = 0;
        lessonOrder = 0;

<<<<<<< HEAD
        section = node.getText().trim();
=======
        sectionTitle = node.getText().trim();
>>>>>>> master

        break;
      }

      case 'h4': {
        subsectionOrder += 1;
        lessonOrder = 0;

<<<<<<< HEAD
        subsection = xpath.fromNode(node).findElement('//span').getText();
=======
        subsectionTitle = xpath.fromNode(node).findElement('//span').getText().trim();
>>>>>>> master

        break;
      }

      case 'a': {
        lessonOrder += 1;

<<<<<<< HEAD
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
=======
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
>>>>>>> master
            break;
          }

          default:
<<<<<<< HEAD
            throw new Error(`Unsupported Link ${node.toString()}`);
        }

        const lesson = xpath.fromNode(node).findElement('//h6').getText();

        const resource = {
          course,
          section,
          sectionOrder,
          subsection,
          subsectionOrder,
          lesson,
          lessonOrder,
          link,
          type,
        };

        resources.push(resource);
=======
            throw new Error(`Unparsable lesson with link ${lessonLink}`);
        }

        resources.push({
          course,
          sectionTitle,
          sectionOrder,
          subsectionTitle,
          subsectionOrder,
          lessonTitle,
          lessonOrder,
          lessonLink,
          lessonType,
        });
>>>>>>> master

        break;
      }

      default:
<<<<<<< HEAD
        throw new Error(`Unsupported TagName ${node.toString()}`);
=======
        throw new Error(`This element is left unhandled:\n${node.toString()}`);
>>>>>>> master
    }
  });

  return resources;
};

/**
 * @param {Array} logs
 * @returns {string}
 */
const parseDownloadLink = (logs) => {
<<<<<<< HEAD
  const found = logs
    .map((entry) => {
      const { message } = JSON.parse(entry.message);
=======
  const foundLog = logs
    .map((log) => {
      const { message } = JSON.parse(log.message);
>>>>>>> master

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

<<<<<<< HEAD
  return get(found, ['url']);
=======
  return get(foundLog, ['url']);
>>>>>>> master
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
