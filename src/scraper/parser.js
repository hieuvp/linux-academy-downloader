const xpath = require('xpath-html');

module.exports = (html) => {
  const nodes = xpath.fromPageSource(html).findElements("//div[@class='syllabus']/*");

  const resources = [];
  const course = 'Mastering Systemd';

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
