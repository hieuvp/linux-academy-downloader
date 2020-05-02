const xpath = require('xpath');
const { DOMParser } = require('xmldom');
const xmlserializer = require('xmlserializer');
const parser = require('parse5');

const query = (expression, source, single = false) => {
  const document = new DOMParser().parseFromString(source);
  const namespace = 'x';
  const select = xpath.useNamespaces({ [namespace]: 'http://www.w3.org/1999/xhtml' });

  // Search Directives in XML
  // Difference "/", "//" and ".//"
  // --> Prefixes with namespace ":x"
  // --> Replace by regex
  const enhancedExpression = expression.replace(/^([^*A-Z\\a-z]*)/g, `$1${namespace}:`);

  return select(enhancedExpression, document, single);
};

/**
 * Get the visible (i.e. not hidden by CSS) innerText of this element,
 * including sub-elements, without any leading or trailing whitespace.
 *
 * @returns {!promise.Thenable<string>} A promise that will be
 *     resolved with the element's visible text.
 */
const getText = () => this.schedule_(
  new command.Command(command.Name.GET_ELEMENT_TEXT),
  'WebElement.getText()',
);

const value = node => node.firstChild.data.trim();

module.exports = (pageSource) => {
  const dom = parser.parse(pageSource);
  const xhtml = xmlserializer.serializeToString(dom);

  const nodes = query('//div[@class=\'syllabus\']/*', xhtml);

  let section;
  let subsection;

  for (const node of nodes) {
    switch (node.tagName) {
      case 'h3':
        section = value(node);
        console.log('section =', section);
        break;
      case 'h4':
        subsection = value(query('//span', node.toString(), true));
        console.log('subsection =', subsection);
        break;

      default:
      // console.log('I don\'t know such values');
    }
  }
};

// {
//   "Course Introduction": [
//   {
//     "Getting Started": [
//       {
//         "title": "Course Introduction",
//         "href": "/cp/courses/lesson/course/1710/lesson/1"
//       }
//     ]
//   }
// ]
// }
