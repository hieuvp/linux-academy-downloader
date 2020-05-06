const xpath = require('xpath-html');

const parseCourse = (html) => {
  const course = xpath
    .fromPageSource(html)
    .findElement("//div[@class='course-title']/h1")
    .getText();

  const nodes = xpath.fromPageSource(html).findElements("//div[@class='syllabus']/*");

  const resources = [];

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

        if (link.startsWith('https://app.linuxacademy.com/challenges/')) {
          type = 'quiz';
        } else if (link.startsWith('https://app.linuxacademy.com/hands-on-labs/')) {
          type = 'lab';
        } else {
          link = `https://linuxacademy.com${link}`;
          type = 'video';
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
      default: {
        console.log("I don't know such values");
        break;
      }
    }
  });

  return resources;
};

module.exports = {
  parseCourse,
};
