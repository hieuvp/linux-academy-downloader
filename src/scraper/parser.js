const xpath = require('xpath-html');

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
            type = 'quiz';
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
            throw new Error(`Unsupported link${node.toString()}`);
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
        throw new Error(`Unsupported TagName${node.toString()}`);
    }
  });

  return resources;
};

module.exports = {
  parseCourse,
};
