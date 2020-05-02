const fs = require('fs');

const parse = require('./parse');


describe('parse', () => {
  it('should return', () => {
    const html = fs.readFileSync(
      `${__dirname}/test-data/course-mastering-systemd.html`,
      'UTF-8',
    );
    parse(html);
  });
});
