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
        const link = node.getAttribute('href');
        const lesson = xpath.fromNode(node).findElement('//h6').getText();
        const type = undefined;

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
